const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

exports.generateToken = user => jwt.sign(user, config.common.secretPass, { expiresIn: '2h' });

exports.comparePass = (pass, passEncrypted) => bcrypt.compare(pass, passEncrypted);

exports.getPagination = (data, page, limit) => {
  const { count: totalUsers, rows: users } = data;
  const currentPage = page ? Number(page) : 0;
  const totalPages = Math.ceil(totalUsers / limit);
  return { totalUsers, users, totalPages, currentPage };
};
