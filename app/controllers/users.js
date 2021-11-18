const logger = require('../logger');
const { encryptPass } = require('../helpers/users');
const { getPagination, getPaginData } = require('../helpers');
const { insertUser, findAllUsers } = require('../services/users');
const { databaseError } = require('../errors');
const { DB_CONNECTION } = require('../../config/constants/errorMessages');
const { ROLE, ROLE_CHANGED, USER_EXISTS } = require('../../config/constants/users_constants');
const { createToken, signUpAdminInteractor } = require('../interactor/users');

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
    const { limit, offset } = getPagination(page, size);
    const users = await findAllUsers(limit, offset);
    const response = getPaginData(users, page, limit, offset);
    res.status(200).send(response);
  } catch (e) {
    logger.error(e);
    next(databaseError(DB_CONNECTION));
  }
};

exports.signUpAdmin = async (req, res, next) => {
  const user = req.body;
  try {
    const respSignUp = await signUpAdminInteractor(user);
    if (respSignUp.message === ROLE_CHANGED) return res.status(200).send({ message: ROLE_CHANGED });
    else if (respSignUp.message === USER_EXISTS) return res.status(200).send({ message: USER_EXISTS });
    return res.status(201).send({ message: `New user was created with role: ${ROLE.admin}` });
  } catch (e) {
    logger.error(e);
    return next(e);
  }
};
