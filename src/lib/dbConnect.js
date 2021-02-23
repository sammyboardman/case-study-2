const mongoose = require('mongoose');
const config = require('config');
const { logger } = require('./logger');

const dbConnect = async () => {
  try {
    await mongoose.connect(config.mongodb.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.log({
      level: 'info',
      message: 'Database connected',
    });
  } catch (error) {
    logger.log({
      level: 'error',
      message: `Failed to connect to database::::::::${error}`,
    });
  }
};
dbConnect();
