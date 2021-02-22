const mongoose = require('mongoose');
const config = require('config');
const app = require('./app');
require('./utils/dbConnect');
const { logger } = require('./utils/logger');

const port = config.server.connection.port || 5000;
app.listen(port, () => {
  logger.log({ level: 'info', message: `%s %s started on port ${port}` });
});

process.on('SIGTERM', () => {
  mongoose.connection.close();
  logger.log({ level: 'info', message: 'Graciously shutdown the server' });
  process.exit(0);
});
