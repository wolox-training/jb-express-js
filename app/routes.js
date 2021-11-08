const { healthCheck } = require('./controllers/healthCheck');
const { signUp, signIn } = require('../app/controllers/users');
const { validateRequest } = require('./middlewares/validator');
const { signUpValidate } = require('../app/schema/user');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [validateRequest(signUpValidate)], signUp);
  app.post('/users/sessions', signIn);
};
