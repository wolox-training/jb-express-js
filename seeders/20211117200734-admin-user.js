'use strict';

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('users', [
      {
        name: 'Admin',
        last_name: 'Wolox',
        mail: 'admin@wolox.co',
        // pass: 'passAdmin123',
        pass: '$2b$10$iSka8yave1qx1De3VADvxOGEHf7lk6O61t1eO6CJzjgj03JvvMgFG',
        role: 'admin'
      }
    ]),

  down: queryInterface => queryInterface.bulkDelete('users', null, {})
};
