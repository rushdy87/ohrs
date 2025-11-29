import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const JobTitle = sequelize.define(
  'JobTitle',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 10,
      },
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    title_search: {
      // for optimized Arabic text search
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'job_titles',
    timestamps: true,
    underscored: true,
  }
);

export default JobTitle;
