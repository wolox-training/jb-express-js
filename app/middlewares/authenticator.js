const logger = require('../logger');
const { decodeToken } = require('../helpers/users');
const { authenticationError } = require('../errors');
const { findUserByEmail } = require('../services/users');
const { TOKEN_INVALID, USER_NOT_ALLOWED } = require('../../config/constants/errorMessages');
const { ROLE } = require('../../config/constants/users_constants');
const { ADMIN_USERS } = require('../../config/constants/routes');

exports.authenticator = async (req, res, next) => {
  try {
    const tokenVerified = decodeToken(req.headers.token);
    logger.info('Token is valid');
    const userFound = await findUserByEmail(tokenVerified.mail);
    if (userFound.length && req.url === ADMIN_USERS && userFound[0].dataValues.role !== ROLE.admin) {
      logger.error(USER_NOT_ALLOWED);
      return next(authenticationError(USER_NOT_ALLOWED));
    }
    if (
      userFound.length &&
      userFound[0].dataValues.name === tokenVerified.name &&
      userFound[0].dataValues.last_name === tokenVerified.last_name
    ) {
      logger.info('User verified');
      return next();
    }
    return next(authenticationError(TOKEN_INVALID));
  } catch (e) {
    logger.error('Token is not valid:', e);
    return next(authenticationError(e.message));
  }
};
