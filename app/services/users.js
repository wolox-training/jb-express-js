const User = require('../models').users;

exports.findUserByEmail = email => User.findAll({ where: { mail: email } });

exports.insertUser = user => User.create(user);

exports.findAllUsers = (limit, offset) => User.findAndCountAll({ limit, offset });
