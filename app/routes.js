// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const { users } = require('../app/controllers/users');
const { validateRequest } = require('./middlewares/validator');
const { signUpValidate } = require('../app/schema/user');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [validateRequest(signUpValidate)], users);
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
