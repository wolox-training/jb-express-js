const logger = require('../logger');
const { generateToken, comparePass } = require('../helpers/users');
const { findUserByEmail, insertUser, updateUser } = require('../services/users');
const { tokenError, authenticationError, databaseErrorrror } = require('../errors');
const { GENERATE_TOKEN, AUTHENTICATION, DB_CONNECTION } = require('../../config/constants/errorMessages');
const { USER_EXISTS, ROLE, CHANGE_ROLE, ROLE_CHANGED } = require('../../config/constants/users_constants');
const { encryptPass } = require('../helpers/users');

exports.createToken = async infoLogin => {
  try {
    const mailFound = await findUserByEmail(infoLogin.mail);
    const validatePass = await comparePass(infoLogin.pass, mailFound[0].pass);
    if (!validatePass) throw authenticationError(AUTHENTICATION);
    const payload = {
      name: mailFound[0].name,
      last_name: mailFound[0].last_name,
      mail: mailFound[0].mail
    };
    const token = generateToken(payload);
    return token;
  } catch (e) {
    if (e.internalCode) throw e;
    logger.error(e);
    throw tokenError(GENERATE_TOKEN);
  }
};

exports.signUpAdminInteractor = async user => {
  const userCloned = JSON.parse(JSON.stringify(user));
  const passEncrypted = await encryptPass(userCloned.pass);
  userCloned.pass = passEncrypted;
  try {
    const userFound = await findUserByEmail(userCloned.mail);
    if (userFound.length) {
      if (userFound[0].dataValues.role === ROLE.basic) {
        logger.info(CHANGE_ROLE);
        const dataToUpdate = { role: ROLE.admin };
        const condition = { where: { id: userFound[0].dataValues.id } };
        await updateUser(dataToUpdate, condition);
        logger.info(ROLE_CHANGED);
        return { message: ROLE_CHANGED };
      } else if (userFound[0].dataValues.role === ROLE.admin) {
        logger.info(USER_EXISTS);
        return { message: USER_EXISTS };
      }
    }
    if (!userCloned.role) userCloned.role = ROLE.admin;
    await insertUser(userCloned);
    logger.info(`New user was created with role: ${ROLE.admin}`);
    return { message: 'saved' };
  } catch (e) {
    logger.error(e);
    throw databaseErrorrror(DB_CONNECTION);
  }
};
