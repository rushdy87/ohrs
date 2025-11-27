import AppError from '../utils/app-error.js';

export const validateIdParam = (req, res, next) => {
  const { id } = req.params;
  if (!id || isNaN(id)) {
    return next(new AppError('Invalid ID parameter', 400));
  }
  next();
};
