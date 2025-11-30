import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const ALLOWED_SCORES = [73, 76, 79, 83, 86, 89, 90];

const Evaluation = sequelize.define(
  'Evaluation',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    employee_id: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'employee_id',
    },

    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 12,
      },
    },

    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [ALLOWED_SCORES],
      },
    },

    comments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    evaluator_id: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'evaluator_id',
    },
  },
  {
    tableName: 'evaluations',
    timestamps: true,
    underscored: true,
  }
);

export default Evaluation;
