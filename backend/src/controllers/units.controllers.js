import catchAsync from '../utils/catch-async.js';
import handleSuccess from '../utils/handle-success.js';
import AppError from '../utils/app-error.js';

import UnitService from '../services/unit.service.js';

export const getAllUnits = catchAsync(async (req, res, next) => {
  const units = await UnitService.getAll();
  handleSuccess(res, units);
});

export const getUnitById = catchAsync(async (req, res, next) => {
  handleSuccess(res, req.unit); // loaded by middleware
});

export const createUnit = catchAsync(async (req, res, next) => {
  const { name, code, notes } = req.body;

  if (!name || !code) {
    return next(new AppError('Name and code are required', 400));
  }

  const newUnit = await UnitService.create({ name, code, notes });

  handleSuccess(res, newUnit, 'Unit created', 201);
});

export const updateUnit = catchAsync(async (req, res, next) => {
  const { name, code, notes } = req.body;

  if (!name && !code && !notes) {
    return next(new AppError('No fields to update', 400));
  }

  const updatedUnit = await UnitService.update(req.unit, { name, code, notes });

  handleSuccess(res, updatedUnit, 'Unit updated');
});

export const deleteUnit = catchAsync(async (req, res, next) => {
  await UnitService.remove(req.unit);

  res.status(204).end();
});
