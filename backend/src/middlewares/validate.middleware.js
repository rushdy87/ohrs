import { ZodError } from 'zod';
import AppError from '../core/app-error.js';
import { validate as isUUID } from 'uuid';
import catchAsync from '../utils/catch-async.js';

export const validateIdParam = (req, res, next) => {
  const { id } = req.params;

  if (!id || !isUUID(id)) {
    return next(new AppError('Invalid UUID format', 400));
  }

  next();
};

export const validateBodyWithZod = (schema) =>
  catchAsync(async (req, res, next) => {
    req.body = await schema.parseAsync(req.body);
    next();
  });
