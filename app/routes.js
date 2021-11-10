const { healthCheck } = require('./controllers/healthCheck');
const { signUp, signIn, getAllUsers } = require('../app/controllers/users');
const { validateRequest } = require('./middlewares/validator');
const { signUpValidate, signInValidate } = require('../app/schema/user');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/users', getAllUsers);
  app.post('/users', [validateRequest(signUpValidate)], signUp);
  app.post('/users/sessions', [validateRequest(signInValidate)], signIn);
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
