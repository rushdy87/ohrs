import Unit from './unit.model.js';
import JobTitle from './job-title.model.js';
import JobSpecification from './job-specification.model.js';
import Employee from './employee.model.js';
import User from './user.model.js';

// ----------------------------------------
// Unit <--> Employees (One-to-Many)
// ----------------------------------------
Unit.hasMany(Employee, {
  foreignKey: 'unit_id',
  as: 'employees',
});

Employee.belongsTo(Unit, {
  foreignKey: 'unit_id',
  as: 'unit',
});

// ----------------------------------------
// JobTitle <--> Employees (One-to-Many)
// ----------------------------------------
JobTitle.hasMany(Employee, {
  foreignKey: 'job_title_id',
  as: 'employees',
});

Employee.belongsTo(JobTitle, {
  foreignKey: 'job_title_id',
  as: 'job_title',
});

// ----------------------------------------
// JobSpecification <--> Employees (One-to-Many)
// ----------------------------------------
JobSpecification.hasMany(Employee, {
  foreignKey: 'job_specification_id',
  as: 'employees',
});

Employee.belongsTo(JobSpecification, {
  foreignKey: 'job_specification_id',
  as: 'job_specification',
});

// ----------------------------------------
// Unit <--> User (One-to-Many)
// ----------------------------------------
Unit.hasMany(User, {
  foreignKey: 'unit_id',
  as: 'users',
});

User.belongsTo(Unit, {
  foreignKey: 'unit_id',
  as: 'unit',
});

export { Unit, JobTitle, JobSpecification, Employee, User };
