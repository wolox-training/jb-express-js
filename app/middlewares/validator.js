const logger = require('../logger');
const { validateError } = require('../errors');

exports.validateRequest = schemaValidate => async (req, res, next) => {
  try {
    await schemaValidate(req.body);
    logger.info('Successful validation');
    return next();
  } catch (e) {
    logger.error('Validations error:', e);
    return next(validateError(e.errors));
  }
};
