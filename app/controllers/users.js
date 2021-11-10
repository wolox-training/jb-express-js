const logger = require('../logger');
const { encryptPass, getPagination } = require('../helpers/users');
const { insertUser, findAllUsers } = require('../services/users');
const { databaseError } = require('../errors');
const { DB_CONNECTION } = require('../../config/constants/errorMessages');
const { createToken } = require('../interactor/users');
const config = require('../../config').common;

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

exports.getAllUsers = async (req, res, next) => {
  try {
    const { page, size } = req.query;
    const limit = size || config.database.limit;
    const offset = page ? page * limit : config.database.offset;
    const users = await findAllUsers(limit, offset);
    const response = getPagination(users, page, limit);
    res.status(200).send(response);
  } catch (e) {
    logger.error(e);
    next(databaseError(DB_CONNECTION));
  }
};
