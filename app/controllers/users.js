const logger = require('../logger');
const { encryptPass, generateToken, comparePass } = require('../helpers/users');
const { insertUser } = require('../services/users');
const { databaseError, tokenError, compareError } = require('../errors');
const { findUserByEmail } = require('../services/users');
const { DB_CONNECTION, GENERATE_TOKEN, COMPARE_PASS } = require('../../config/constants/errorMessages');

exports.signUp = async (req, res, next) => {
  const user = req.body;
  const passEncrypted = await encryptPass(user.pass);
  user.pass = passEncrypted;
  try {
    await insertUser(user);
    logger.info(`New user was created with name: ${user.name}`);
    res.status(201).send(`New user was created with name: ${user.name}`);
  } catch (e) {
    logger.error(`User with name: ${user.name}, could not be created`);
    logger.error(e);
    next(databaseError(DB_CONNECTION));
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const mailFound = await findUserByEmail(req.body.mail);
    const validatePass = await comparePass(req.body.pass, mailFound[0].pass);
    if (!validatePass) next(compareError(COMPARE_PASS));
    const payload = {
      name: mailFound[0].name,
      last_name: mailFound[0].last_name,
      mail: req.body.mail
    };
    const token = generateToken(payload);
    logger.info(`Successful login. Token: ${token}`);
    res.status(200).send({ token });
  } catch (e) {
    logger.error(e);
    next(tokenError(GENERATE_TOKEN));
  }
};
