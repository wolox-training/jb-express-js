const logger = require('../logger');
const { encryptPass } = require('../helpers/users');
const { insertUser } = require('../services/users');
const { databaseError } = require('../errors');

exports.users = async (req, res) => {
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
    throw databaseError(e.message);
  }
};
