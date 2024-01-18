const devLogger = require('./development.logger')
const prodLogger = require('./production.logger')
const { NODE_ENV } = require('../dotenv')

/**
 * Dynamically selects the appropriate logger based on the environment.
 *
 * @type {winston.Logger}
 */
let logger = devLogger()

// Switch between logger configurations based on the NODE_ENV
switch (NODE_ENV) {
  case 'development': {
    logger = devLogger() // Use development logger for 'development' environment
    break
  }
  case 'production': {
    logger = prodLogger() // Use production logger for 'production' environment
    break
  }
}

// Export the selected logger for use in other parts of the application
module.exports = logger
