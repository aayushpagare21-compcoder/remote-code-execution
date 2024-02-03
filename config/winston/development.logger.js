const winston = require('winston')

const developmentLogger = () => {
  return winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
      winston.format.timestamp({ format: 'HH:mm:ss' }),
      winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
      ),
    ),
    transports: [new winston.transports.Console()],
  })
}

module.exports = developmentLogger
