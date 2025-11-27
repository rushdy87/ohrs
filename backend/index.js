import envConfig from './src/config/env.js';
import app from './src/app.js';
import { connectDB } from './src/config/db.js';
import './src/models/index.js';

const { port, host } = envConfig;

async function start() {
  try {
    await connectDB();
    app.listen(port, host, () => {
      console.log(`Server running at http://${host}:${port}`);
    });
  } catch (err) {
    console.error('Startup error:', err);
  }
}

start();
