import express from 'express';

import { errorHandler } from './middlewares/error.middleware.js';
import AppError from './utils/app-error.js';

import unitsRoutes from './routes/units.routes.js';
import jobTitleRoutes from './routes/job-title.routes.js';
import jobSpecificationRoutes from './routes/job_specification.routes.js';

const app = express();

const BASE_API_PATH = '/api/v1';

// healthy check endpoint
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

app.use(`${BASE_API_PATH}/units`, unitsRoutes);
app.use(`${BASE_API_PATH}/job-titles`, jobTitleRoutes);
app.use(`${BASE_API_PATH}/job-specifications`, jobSpecificationRoutes);

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use((req, res, next) => {
  const err = new AppError(
    `Cannot find ${req.originalUrl} on this server`,
    404
  );
  next(err);
});

app.use(errorHandler);

export default app;
