import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Unit = sequelize.define(
  'Unit',
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },

    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'units',
    timestamps: true,
    underscored: true,
  }
);

export default Unit;
