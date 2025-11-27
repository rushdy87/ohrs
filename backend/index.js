import envConfig from './src/config/env.js';
import app from './src/app.js';

const { port, host } = envConfig;

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
