import AppError from '../core/app-error.js';
import { validate as isUUID } from 'uuid';

export const validateIdParam = (req, res, next) => {
  const { id } = req.params;

  if (!id || !isUUID(id)) {
    return next(new AppError('Invalid UUID format', 400));
  }

  next();
};
