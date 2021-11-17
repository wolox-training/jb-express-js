const { healthCheck } = require('./controllers/healthCheck');
const { signUp, signIn, getAllUsers, signUpAdmin } = require('../app/controllers/users');
const { validateRequest } = require('./middlewares/validator');
const { authenticator } = require('./middlewares/authenticator');
const { signUpValidate, signInValidate } = require('../app/schema/user');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/users', [authenticator], getAllUsers);
  app.post('/users', [validateRequest(signUpValidate)], signUp);
  app.post('/users/sessions', [validateRequest(signInValidate)], signIn);
  app.post('/admin/users', signUpAdmin);
};
