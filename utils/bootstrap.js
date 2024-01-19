// Import necessary modules and dependencies
const logger = require('../config/winston')
const RabbitMQUtils = require('./RabbitMQ')
const {
  QUEUE_HOST,
  QUEUE_PASSWORD,
  QUEUE_NAME,
  QUEUE_PORT,
  QUEUE_USERNAME,
} = require('../config/dotenv')

/**
 * Bootstrap function for initializing the application.
 * Connects to RabbitMQ and sets up necessary configurations.
 */
async function bootstrap() {
  /**
   * Sets up the RabbitMQ connection and declares a queue.
   * @throws {Error} If there is an issue connecting to RabbitMQ or declaring the queue.
   */
  async function setupRabbitMQ() {
    // Connect Rabbit-MQ
    const queue = new RabbitMQUtils({
      hostname: QUEUE_HOST,
      port: QUEUE_PORT,
      username: QUEUE_USERNAME,
      password: QUEUE_PASSWORD,
      queueName: QUEUE_NAME,
    })

    try {
      await queue.connect()
      await queue.declareQueue()
      logger.info('RabbitMQ setup successful')
    } catch (error) {
      // Handle connection or queue declaration errors
      logger.error('Error setting up RabbitMQ:', error.message)
      throw error // Rethrow the error to indicate a failure in the setup
    }
  }

  try {
    // Perform the RabbitMQ setup
    await setupRabbitMQ()
    logger.info('All connections of the application established')
  } catch (error) {
    // Handle any errors that occurred during setup
    logger.error('Error during bootstrap:', error.message)
    // You might want to exit the application or take other appropriate actions here
  }
}

// Export the bootstrap function to be used in other parts of the application
module.exports = bootstrap
