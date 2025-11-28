import catchAsync from '../utils/catch-async.js';
import handleSuccess from '../utils/handle-success.js';
import employeeService from '../services/employee.service.js';

export const getAllEmployees = catchAsync(async (req, res, next) => {
  const employees = await employeeService.getAll();
  handleSuccess(res, employees);
});

export const getActiveEmployees = catchAsync(async (req, res, next) => {
  const employees = await employeeService.getAllActive();
  handleSuccess(res, employees);
});

export const getEmployeeById = catchAsync(async (req, res, next) => {
  handleSuccess(res, req.employee); // loaded by middleware
});

export const createEmployee = catchAsync(async (req, res, next) => {
  const newEmployee = await employeeService.create(req.body);

  handleSuccess(res, newEmployee, 'Employee created', 201);
});

export const updateEmployee = catchAsync(async (req, res, next) => {
  const updatedEmployee = await employeeService.update(req.employee, req.body);

  handleSuccess(res, updatedEmployee, 'Employee updated');
});

export const deleteEmployee = catchAsync(async (req, res, next) => {
  await employeeService.remove(req.employee);

  res.status(204).end();
});

export const getDeletedEmployees = catchAsync(async (req, res, next) => {
  const deletedEmployees = await employeeService.getDeleted();
  handleSuccess(res, deletedEmployees);
});
