import AppError from '../core/app-error.js';

export const notFound = (req, res, next) => {
  const err = new AppError(
    `Cannot find ${req.originalUrl} on this server`,
    404
  );
  next(err);
};
