const Ajv = require('ajv');
const logger = require('../logger');
const { validateError, databaseError } = require('../errors');
const { findUserByEmail } = require('../services/users');
const { DOMAINS } = require('../../config/constants/users_constants');
const { DB_CONNECTION } = require('../../config/constants/errorMessages');

const ajv = new Ajv({ allErrors: true });

ajv.addFormat('woloxEmail', {
  validate: mail => {
    logger.info('Validating email in Wolox format');
    const mailDomain = mail.split('@');
    if (!mailDomain[1]) return false;

    const validate = domain => domain === mailDomain[1];
    if (!DOMAINS.some(validate)) return false;
    return true;
  }
});

const checkMailExists = async (schema, data, next) => {
  try {
    const mailFound = await findUserByEmail(data);
    logger.info('User found:', mailFound);
    return !mailFound.length;
  } catch (e) {
    logger.error(e.message);
    return next(databaseError(DB_CONNECTION));
  }
};

ajv.addKeyword('mailExists', {
  async: true,
  type: 'string',
  validate: checkMailExists
});

exports.validateRequest = schema => async (req, res, next) => {
  try {
    const validate = ajv.compile(schema.schema);
    await validate(req.body);
    next();
  } catch (e) {
    logger.error(e.errors);
    next(validateError(e.errors));
  }
};
