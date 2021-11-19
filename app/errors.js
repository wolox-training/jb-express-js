const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.SERVICE_ERROR = 'service_error';
exports.serviceError = message => internalError(message, exports.SERVICE_ERROR);

exports.VALIDATE_ERROR = 'validate_error';
exports.validateError = message => internalError(message, exports.VALIDATE_ERROR);

exports.ENCRYPT_ERROR = 'encrypt_error';
exports.encryptError = message => internalError(message, exports.ENCRYPT_ERROR);

exports.TOKEN_ERROR = 'token_error';
exports.tokenError = message => internalError(message, exports.TOKEN_ERROR);

exports.AUTHENTICATION_ERROR = 'authentication_error';
exports.authenticationError = message => internalError(message, exports.AUTHENTICATION_ERROR);

exports.AUTHORIZATION_ERROR = 'authorization_error';
exports.authorizationError = message => internalError(message, exports.AUTHORIZATION_ERROR);
