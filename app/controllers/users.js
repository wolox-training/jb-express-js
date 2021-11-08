const logger = require('../logger');
const { encryptPass, generateToken } = require('../helpers/users');
const { insertUser } = require('../services/users');
const { databaseError, tokenError } = require('../errors');
const { DB_CONNECTION, GENERATE_TOKEN } = require('../../config/constants/errorMessages');

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

exports.signIn = (req, res, next) => {
  try {
    const token = generateToken(req.body);
    logger.info(`Successful login. Token: ${token}`);
    res.status(200).send({ token });
  } catch (e) {
    logger.error(e);
    next(tokenError(GENERATE_TOKEN));
  }
};
