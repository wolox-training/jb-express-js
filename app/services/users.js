const User = require('../models').users;

exports.findUserByEmail = email => User.findAll({ where: { mail: email } });
