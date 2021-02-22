const { serve, setup } = require('swagger-ui-express');
const { API_BASE_PATH } = require('../utils/constants');
const { notFound } = require('../utils/responseFormat');
const { recordsRouter } = require('./record');
const swaggerDoc = require('./swaggerDoc.json');

function routeManager(app) {
  app.use(`${API_BASE_PATH}/fetch-records`, recordsRouter);
  app.use(`${API_BASE_PATH}/documentation`, serve, setup(swaggerDoc));
  app.use((req, res) => notFound(res, 'No way here! Route not found'));
}

module.exports = routeManager;
