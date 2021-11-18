const logger = require('../logger');
const { decodeToken } = require('../helpers/users');
const { authenticationError, authorizationError } = require('../errors');
const { findUserByEmail } = require('../services/users');
const { TOKEN_INVALID, USER_NOT_ALLOWED } = require('../../config/constants/errorMessages');
const { ROLE } = require('../../config/constants/users_constants');

exports.authenticator = isAdminFn => async (req, res, next) => {
  try {
    const tokenVerified = decodeToken(req.headers.token);
    logger.info('Token is valid');
    const userFound = await findUserByEmail(tokenVerified.mail);
    if (isAdminFn) isAdminFn(userFound[0].dataValues);
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
    if (e.internalCode) return next(e);
    logger.error('Token is not valid:', e);
    return next(authenticationError(e.message));
  }
};

exports.isAdmin = adminUser => {
  if (adminUser.role !== ROLE.admin) {
    logger.error(USER_NOT_ALLOWED);
    throw authorizationError(USER_NOT_ALLOWED);
  }
};
