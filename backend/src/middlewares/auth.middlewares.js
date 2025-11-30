import AppError from '../core/app-error.js';
import { User } from '../models/index.js';
import catchAsync from '../utils/catch-async.js';
import { verifyToken } from '../utils/token.util.js';

export const protect = catchAsync(async (req, res, next) => {
  let token;

  // 1) extract token from headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // 2) extract token from cookies - In the future, we might want to enable this
  // if (!token && req.cookies && req.cookies.jwt) {
  //   token = req.cookies.jwt;
  // }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 3) verify token
  let decoded;
  try {
    decoded = verifyToken(token);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(
        new AppError('Your token has expired. Please log in again.', 401)
      );
    }
    if (err.name === 'JsonWebTokenError') {
      return next(new AppError('Invalid token. Please log in again.', 401));
    }
    return next(err);
  }

  // 4) Get user from the token
  const user = await User.findByPk(decoded.id);

  if (!user || !user.is_active) {
    return next(
      new AppError(
        'The user belonging to this token no longer exists or is inactive.',
        401
      )
    );
  }
  // 5) Grant access to protected route
  req.user = user;
  next();
});

/*
  {
      id: user.id,
      role: user.role,
      unit_id: user.unit_id,
      is_active: user.is_active,
    }
    */
