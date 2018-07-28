/* eslint-disable no-console */
import logger from 'winston';
import app from './app';

const port = process.env.APP_PORT || 3000;
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) => {
  logger.error('Unhandled Rejection at: Promise ', p, reason);
});

server.on('listening', () => {
  logger.info(`Listening on port ${server.address().port}`);
});
