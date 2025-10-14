const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(
    `[${req.method}] ${req.originalUrl} ➜ ${statusCode} - ${message}\n${err.stack}`
  );

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
