const winston = require('winston')

/**
 * Creates a development logger instance using Winston.
 *
 * @function developmentLogger
 * @returns {winston.Logger} - Instance of a Winston logger configured for development.
 */
const developmentLogger = () => {
  // Create and configure a Winston logger for development
  return winston.createLogger({
    level: 'debug', // Set the log level to 'debug'
    format: winston.format.combine(
      winston.format.colorize(), // Add colorization to log entries
      winston.format.simple(), // Use simple formatting
      winston.format.timestamp({ format: 'HH:mm:ss' }), // Add timestamp with custom format
      winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
      ), // Custom log entry format
    ),
    transports: [new winston.transports.Console()], // Log messages to the console
  })
}

// Export the developmentLogger function for use in other parts of the application
module.exports = developmentLogger
