import express from 'express';

const app = express();

// healthy check endpoint
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

export default app;
