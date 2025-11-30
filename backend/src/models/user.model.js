import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import { sequelize } from '../config/db.js';
import config from '../config/env.js';

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    // temporary role for access control, in future link to roles table
    role: {
      type: DataTypes.ENUM('root', 'manager', 'admin', 'supervisor', 'user'),
      allowNull: false,
      defaultValue: 'user',
    },

    unit_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: 'users',
    timestamps: true,
  }
);

// Hash password before saving
User.beforeCreate(async (user) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, config.saltRounds);
  }
});

// Hash password before updating
User.beforeUpdate(async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, config.saltRounds);
  }
});

// helper method to validate password, used in authentication
User.prototype.validatePassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

export default User;
