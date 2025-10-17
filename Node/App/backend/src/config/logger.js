const winston = require("winston");

const logFormat = winston.format.combine(
  winston.format.colorize({ all: true }), 
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf((info) => {
    return `${info.timestamp} [${info.level}] ➜ ${info.message}`;
  })
);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      (info) => `${info.timestamp} [${info.level.toUpperCase()}] - ${info.message}`
    )
  ),
  transports: [
    new winston.transports.Console({
      format: logFormat,
    }),

    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),

    new winston.transports.File({
      filename: "logs/combined.log",
    }),
  ],
});

module.exports = logger;
