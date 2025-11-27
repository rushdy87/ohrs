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
    console.log('✅ Database connection OK'.bgGreen.black.underline);

    await sequelize.sync({ alter: true });
  } catch (err) {
    console.error('❌ DB error:'.bgRed.white, err.message);
    throw err;
  }
};

export { sequelize, connectDB };
