const winston = require('winston')

/**
 * Creates a production logger instance using Winston.
 *
 * @function productionLogger
 * @returns {winston.Logger} - Instance of a Winston logger configured for production.
 */
const productionLogger = () => {
  // Create and configure a Winston logger for production
  return winston.createLogger({
    level: 'info', // Set the log level to 'info'
    format: winston.format.combine(
      winston.format.timestamp(), // Add timestamp to log entries
      winston.format.json(), // Format log entries as JSON
    ),
    transports: [
      // Use a file transport to log messages to 'production.log'
      new winston.transports.File({ filename: 'production.log' }),
    ],
  })
}

// Export the productionLogger function for use in other parts of the application
module.exports = productionLogger
