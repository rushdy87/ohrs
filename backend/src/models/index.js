import sequelize from '../config/db.js';
import Unit from './unit.model.js';

// Initialize models
const models = {};

models.Unit = Unit;

// Add future models here…
// models.Employee = EmployeeModel;
// models.JobTitle = JobTitleModel;

export { sequelize, models };
