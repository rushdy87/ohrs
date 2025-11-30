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
      unitId: user.unitId,
      isActive: user.isActive,
    },
    secret,
    { expiresIn }
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
