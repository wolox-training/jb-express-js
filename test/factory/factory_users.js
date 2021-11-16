const { factory } = require('factory-girl');
const { factoryByModel } = require('../factory/factory_by_models');

factoryByModel('users', {});
exports.createUser = user => factory.create('users', user);
