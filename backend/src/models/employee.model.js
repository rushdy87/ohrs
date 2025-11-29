import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Employee = sequelize.define(
  'Employee',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name_ar: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    name_en: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    employee_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },

    gender: {
      type: DataTypes.ENUM('ذكر', 'أنثى'),
      allowNull: false,
      defaultValue: 'ذكر',
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isEmail: true },
    },

    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    job_role: {
      type: DataTypes.ENUM('مهندس', 'فني', 'عامل', 'مكتبي'),
      allowNull: true,
    },

    job_status: {
      type: DataTypes.ENUM('ملاك', 'عقد', 'أجر يومي', 'عقد محافظة'),
      allowNull: false,
    },

    job_location: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    shift_group: {
      type: DataTypes.ENUM('A', 'B', 'C', 'D', 'صباحي'),
      allowNull: false,
      defaultValue: 'صباحي',
    },

    degree: {
      type: DataTypes.ENUM(
        'دكتوراه',
        'ماجستير',
        'دبلوم عالي',
        'بكلوريوس',
        'دبلوم',
        'إعدادية',
        'متوسطة',
        'ابتدائية',
        'يقرأ ويكتب'
      ),
      allowNull: true,
    },

    degree_specialization: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    loaning_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    loaning_from: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    loaning_end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    ppe_size: {
      type: DataTypes.ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'),
      allowNull: true,
    },

    safety_shoes_size: {
      type: DataTypes.ENUM(
        '36',
        '37',
        '38',
        '39',
        '40',
        '41',
        '42',
        '43',
        '44',
        '45',
        '46',
        '47',
        '48'
      ),
      allowNull: true,
    },

    employee_date_of_hire: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    remuneration_group: {
      type: DataTypes.ENUM('first', 'second', 'monthly', 'loader'),
      allowNull: true,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // Foreign Keys (BIGINT)
    unit_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: 'units', key: 'id' },
    },

    job_title_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: 'job_titles', key: 'id' },
    },

    job_specification_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: 'job_specifications', key: 'id' },
    },

    name_ar_search: {
      // for optimized Arabic text search
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'employees',
    timestamps: true,
    underscored: true,
  }
);

export default Employee;
