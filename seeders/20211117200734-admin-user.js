'use strict';
const { encryptPass } = require('../app/helpers/users');
const { ROLE } = require('../config/constants/users_constants');

module.exports = {
  up: async queryInterface =>
    queryInterface.bulkInsert('users', [
      {
        name: 'Admin',
        last_name: 'Wolox',
        mail: 'admin@wolox.co',
        pass: await encryptPass('passAdmin123'),
        role: ROLE.admin
      }
    ]),

  down: queryInterface => queryInterface.bulkDelete('users', null, {})
};
