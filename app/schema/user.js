const ajv = require('../schema');
const logger = require('../logger');
const { databaseError } = require('../errors');
const { findUserByEmail } = require('../services/users');
const { DOMAINS } = require('../../config/constants/users_constants');
const { DB_CONNECTION } = require('../../config/constants/errorMessages');

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

const schemaSignUp = {
  $async: true,
  type: 'object',
  required: ['name', 'last_name', 'mail', 'pass'],
  properties: {
    name: {
      type: 'string'
    },
    last_name: {
      type: 'string'
    },
    mail: {
      type: 'string',
      format: 'woloxEmail',
      mailExists: { table: 'users' }
    },
    pass: {
      type: 'string',
      minLength: 8
    }
  },
  additionalProperties: false
};

exports.signUpValidate = ajv.compile(schemaSignUp);
