const winston = require('winston')

const productionLogger = () => {
  return winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
    transports: [new winston.transports.File({ filename: 'production.log' })],
  })
}

module.exports = productionLogger
