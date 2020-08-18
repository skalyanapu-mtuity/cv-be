const winston = require('winston');
const expressWinston = require('express-winston');

const { Logger } = winston;

/**
 * Ideally we could integrate cloud logging pipeline
 * for below transports middileware to push the 
 * logs for monitoring.
 */
const getTransports = () => {
  const transports = [
    new winston.transports.Console({
      colorize: true,
    }),
  ];
  return transports;
};

const logger = new Logger({
  level: process.env.NODE_ENV !== 'production' ? 'verbose' : 'info',
  transports: getTransports(),
});


module.exports = {
  error: logger.error,
  warn: logger.warn,
  info: logger.info,
  log: logger.log,
  verbose: logger.verbose,
  debug: logger.debug,
  silly: logger.silly,
};
