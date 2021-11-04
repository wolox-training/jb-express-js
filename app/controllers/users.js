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
    logger.info(`User registered with name: ${user.name}`);
    res.status(201).send(`User registered with name: ${user.name}`);
  } catch (e) {
    logger.error(`User with name: ${user.name}, could not be registered`);
    logger.error(e);
    throw databaseError(e.message);
  }
};
