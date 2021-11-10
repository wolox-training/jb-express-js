const logger = require('../logger');
const { encryptPass } = require('../helpers/users');
const { insertUser } = require('../services/users');
const { databaseError } = require('../errors');
const { DB_CONNECTION } = require('../../config/constants/errorMessages');
const { createToken } = require('../interactor/users');

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
    const token = await createToken(req.body);
    logger.info(`Successful login. Token: ${token}`);
    res.status(200).send({ token });
  } catch (e) {
    logger.error(e);
    next(e);
  }
};
