import { Sequelize } from 'sequelize';
import envConfig from './env.js';

const sequelize = new Sequelize(
  envConfig.db.name,
  envConfig.db.user,
  envConfig.db.pass,
  {
    host: envConfig.db.host,
    dialect: envConfig.db.dialect,
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // TEMP: sync models
    // This MUST happen AFTER all models are imported
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error('DB connection error:', error);
  }
};

export default sequelize;
export { connectDB };
