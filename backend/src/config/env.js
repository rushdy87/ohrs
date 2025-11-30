import dotenv from 'dotenv';
import path from 'path';

const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';

dotenv.config({ path: path.resolve(process.cwd(), envFile), quiet: true });

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env var: ${name}`);
  }
  return value;
}

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  host: process.env.HOST || 'localhost',
  port: Number(process.env.PORT) || 5000,

  db: {
    host: required('DATABASE_HOST'),
    name: required('DATABASE_NAME'),
    user: required('DATABASE_USER'),
    pass: required('DATABASE_PASSWORD'),
    dialect: required('DATABASE_DIALECT'),
  },
  saltRounds: Number(process.env.SALT_ROUNDS) || 10,
  jwt: {
    secret: required('JWT_SECRET'),
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
};

export default config;
