const { ROLE } = require('../../config/constants/users_constants');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      pass: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM,
        values: [ROLE.basic, ROLE.admin],
        allowNull: false,
        defaultValue: ROLE.basic
      }
    },
    {
      timestamps: false
    }
  );
  return User;
};
