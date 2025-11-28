import 'colors';
import { ZodError } from 'zod';
import AppError from '../core/app-error.js';

const handleSequelizeError = (err) => {
  // Basic handling, you can extend later
  if (err.name === 'SequelizeUniqueConstraintError') {
    const field = Object.keys(err.fields || {})[0] || 'field';
    const message = `Duplicate value for ${field}. Please use another value.`;
    return new AppError(message, 400);
  }

  if (err.name === 'SequelizeValidationError') {
    const messages = err.errors.map((e) => e.message).join('. ');
    return new AppError(messages, 400);
  }

  if (err.name === 'SequelizeDatabaseError') {
    return new AppError(
      'Database error. Please contact the administrator.',
      500
    );
  }

  return err;
};

const handleZodError = (err) => {
  const messages = err.issues.map((e) => {
    const path = e.path.join('.');
    return `${path}: ${e.message}`;
  });

  return new AppError(messages.join(' | '), 400);
};

const sendErrorDev = (err, req, res) => {
  console.error('ERROR 💥'.bgRed.white, err);

  res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  // Operational, trusted error → send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Programming or unknown error → don’t leak details
  console.error('UNEXPECTED ERROR 💥'.bgRed.white, err);

  return res.status(500).json({
    status: 'error',
    message: 'Something went very wrong.',
  });
};

const errorHandler = (err, req, res, next) => {
  let error = err;

  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  // 1) Zod errors
  if (err instanceof ZodError || (err.issues && Array.isArray(err.issues))) {
    error = handleZodError(err);
  }

  // 2) Sequelize errors
  if (error.name && error.name.startsWith('Sequelize')) {
    error = handleSequelizeError(error);
  }

  // 3) Development vs production
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, req, res);
  } else {
    sendErrorProd(error, req, res);
  }
};

export { errorHandler };
