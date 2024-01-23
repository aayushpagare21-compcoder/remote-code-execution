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
   * @type {number}
   */
  PORT: process.env.PORT,

  /**
   * The environment in which the application is running.
   *
   * @type {string}
   */
  NODE_ENV: process.env.NODE_ENV,

  /**
   * Number of replica of servers.
   *
   * @type {number}
   */
  SERVERS: process.env.SERVERS,

  /**
   * Rabbit MQ host.
   *
   * @type {string}
   */
  QUEUE_HOST: process.env.QUEUE_HOST,

  /**
   * Rabbit MQ Port
   *
   * @type {number}
   */
  QUEUE_PORT: process.env.QUEUE_PORT,

  /**
   * Rabbit MQ User Name
   *
   * @type {string}
   */
  QUEUE_USER_NAME: process.env.QUEUE_USER_NAME,

  /**
   * Rabbit MQ Password
   *
   * @type {string}
   */
  QUEUE_USER_PASSWORD: process.env.QUEUE_USER_PASSWORD,
}
