import express from 'express';

import { errorHandler } from './middlewares/error.middleware.js';
import { notFound } from './middlewares/not-found.middleware.js';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import unitRoutes from './routes/unit.routes.js';
import jobTitleRoutes from './routes/job-title.routes.js';
import jobSpecificationRoutes from './routes/job_specification.routes.js';
import employeeRoutes from './routes/employee.routes.js';

const app = express();

const BASE_API_PATH = '/api/v1';

// healthy check endpoint
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

app.use(`${BASE_API_PATH}/auth`, authRoutes);
app.use(`${BASE_API_PATH}/users`, userRoutes);
app.use(`${BASE_API_PATH}/units`, unitRoutes);
app.use(`${BASE_API_PATH}/job-titles`, jobTitleRoutes);
app.use(`${BASE_API_PATH}/job-specifications`, jobSpecificationRoutes);
app.use(`${BASE_API_PATH}/employees`, employeeRoutes);

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use(notFound);

app.use(errorHandler);

export default app;
