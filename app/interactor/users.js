const logger = require('../logger');
const { generateToken, comparePass } = require('../helpers/users');
const { findUserByEmail } = require('../services/users');
const { tokenError, authenticationError } = require('../errors');
const { GENERATE_TOKEN, AUTHENTICATION } = require('../../config/constants/errorMessages');

exports.createToken = async (req, next) => {
  try {
    const mailFound = await findUserByEmail(req.body.mail);
    const validatePass = await comparePass(req.body.pass, mailFound[0].pass);
    if (!validatePass) return next(authenticationError(AUTHENTICATION));
    const payload = {
      name: mailFound[0].name,
      last_name: mailFound[0].last_name,
      mail: req.body.mail
    };
    const token = generateToken(payload);
    return token;
  } catch (e) {
    logger.error(e);
    return next(tokenError(GENERATE_TOKEN));
  }
};
