const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbConnection');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
  },
  phone_number: {
    type: DataTypes.STRING,
  },
  profile_picture_url: {
    type: DataTypes.STRING,
  },
  birth_date: {
    type: DataTypes.DATE,
  },
  address: {
    type: DataTypes.STRING,
  },
  preferences: {
    type: DataTypes.JSON,
  },
  social_login_provider: {
    type: DataTypes.STRING,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  failed_login_attempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
}, {
  timestamps: true, // Para garantir que createdAt e updatedAt estejam habilitados
});

module.exports = User;
