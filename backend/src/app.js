import express from 'express';

import unitsRoutes from './routes/units.routes.js';

const app = express();

const BASE_API_PATH = '/api/v1';

// healthy check endpoint
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

app.use(`${BASE_API_PATH}/units`, unitsRoutes);

export default app;
