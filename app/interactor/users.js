const logger = require('../logger');
const { generateToken, comparePass } = require('../helpers/users');
const { findUserByEmail } = require('../services/users');
const { tokenError, authenticationError } = require('../errors');
const { GENERATE_TOKEN, AUTHENTICATION } = require('../../config/constants/errorMessages');

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
