const logger = require('../logger');
const { decodeToken } = require('../helpers/users');
const { authenticationError } = require('../errors');
const { findUserByEmail } = require('../services/users');
const { TOKEN_INVALID } = require('../../config/constants/errorMessages');

exports.authenticator = async (req, res, next) => {
  try {
    const tokenVerified = decodeToken(req.headers.token);
    logger.info('Token is valid');
    const userFound = await findUserByEmail(tokenVerified.mail);
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
