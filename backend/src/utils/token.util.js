import jwt from 'jsonwebtoken';
import config from '../config/env.js';

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

export const signToken = (user) => {
  const secret = config.jwt.secret || process.env.JWT_SECRET;
  const expiresIn = config.jwt.expiresIn || '1d';

  if (!secret) {
    throw new Error(
      'JWT secret is not defined. Set JWT_SECRET or config.jwtSecret'
    );
  }

  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      unit_id: user.unit_id,
      is_active: user.is_active,
    },
    secret,
    { expiresIn }
  );
};

export const verifyToken = (token) => {
  const secret = config.jwtSecret || process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT secret is not defined');
  }
  return jwt.verify(token, secret);
};
