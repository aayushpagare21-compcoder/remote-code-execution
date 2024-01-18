require('dotenv').config({ path: '.env' })

module.exports = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  SERVERS: process.env.SERVERS,
} // Load environment variables from the .env file using dotenv
require('dotenv').config({ path: '.env' })

/**
 * Application configuration object.
 *
 * @typedef {Object} AppConfig
 * @property {string} PORT - The port on which the application will listen.
 * @property {string} NODE_ENV - The environment in which the application is running (e.g., 'development', 'production').
 * @property {string} SERVERS - A comma-separated list of servers (assuming it's a string).
 */

/**
 * Application configuration.
 *
 * @type {AppConfig}
 */
module.exports = {
  /**
   * The port on which the application will listen.
   *
   * @type {string}
   */
  PORT: process.env.PORT,

  /**
   * The environment in which the application is running.
   *
   * @type {string}
   */
  NODE_ENV: process.env.NODE_ENV,

  /**
   * A comma-separated list of servers.
   *
   * @type {string}
   */
  SERVERS: process.env.SERVERS,

  //TODO: Add rabbit mq env vars
}
