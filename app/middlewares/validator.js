const Ajv = require('ajv');
const logger = require('../logger');
const { validateError, databaseError } = require('../errors');
const { findUserByEmail } = require('../services/users');

const ajv = new Ajv({ allErrors: true });

ajv.addFormat('woloxEmail', {
  validate: mail => {
    logger.info('Validating email in Wolox format');
    const domains = ['wolox.com.ar', 'wolox.co', 'wolox.cl'];
    const mailDomain = mail.split('@');
    if (!mailDomain[1]) return false;

    const validate = domain => domain === mailDomain[1];
    if (!domains.some(validate)) return false;
    return true;
  }
});

const checkMailExists = async (schema, data) => {
  try {
    const mailFound = await findUserByEmail(data);
    logger.info('User found:', mailFound);
    return !mailFound.length;
  } catch (e) {
    logger.error(e.message);
    throw databaseError(e.message);
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
