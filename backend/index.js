import 'colors';
import envConfig from './src/config/env.js';
import { connectDB } from './src/config/db.js';
import app from './src/app.js';

const { host, port } = envConfig;

async function start() {
  try {
    await connectDB();
    app.listen(port, host, () => {
      console.log(
        `Server is running at ${`http://${host}:${port}`.red}`.bgWhite.black
      );
    });
  } catch (err) {
    console.error('Startup error:'.bgRed.white, err);
  }
}

start();
