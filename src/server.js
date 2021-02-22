const mongoose = require('mongoose');
const config = require('config');
const app = require('./app');
require('./utils/dbConnect');
const { logger } = require('./utils/logger');
const routeManager = require('./routes');

routeManager(app);
const port = config.server.connection.port || 5000;
const server = app.listen(port, () => {
  logger.log({ level: 'info', message: `%s %s started on port ${port}` });
});

process.on('SIGTERM', () => {
  mongoose.connection.close();
  logger.log({ level: 'info', message: 'Graciously shutdown the server' });
  process.exit(0);
});

module.exports = { server };
