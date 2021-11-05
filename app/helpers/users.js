const bcrypt = require('bcrypt');
const logger = require('../logger');
const config = require('../../config/');
const { encryptError } = require('../errors');

exports.encryptPass = pass => {
  try {
    logger.info('encrypting pass');
    return bcrypt.hash(pass, parseInt(config.common.passEncrypt.saltRounds));
  } catch (e) {
    logger.error(e.message);
    throw encryptError(e.message);
  }
};
