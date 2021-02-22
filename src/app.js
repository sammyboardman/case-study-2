const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const { logger } = require('./utils/logger');

const app = express();
app.use(express.json());
app.use(cors());
app.set('trust proxy', true);
// requirements required only on production environments
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
  app.use(compression());
  app.use(morgan('combined'), { stream: { write: (msg) => logger.info(msg) } });
} else {
  app.use(morgan('dev'));
}

module.exports = app;
