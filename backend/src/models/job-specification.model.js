import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const JobSpecification = sequelize.define(
  'JobSpecification',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name_ar: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },

    name_en: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'job_specifications',
    timestamps: true,
    underscored: true,
    indexes: [{ fields: ['name_ar'] }, { fields: ['name_en'] }],
  }
);

export default JobSpecification;
