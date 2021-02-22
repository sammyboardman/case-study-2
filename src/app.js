const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { logger } = require('./utils/logger');

const app = express();
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
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 1000 requests per windowMs
});
app.use(limiter);
app.use(express.json());

module.exports = app;
