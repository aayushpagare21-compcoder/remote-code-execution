const amqp = require('amqplib')
const logger = require('../config/winston')

/**
 * RabbitMQ utility class for managing connections, queues, and messages.
 */
class RabbitMQUtils {
  /**
   * Constructor for RabbitMQUtils.
   * @param {object} config - RabbitMQ configuration including hostname, port, username, password, and queueName.
   */
  constructor(config) {
    this.config = config
    this.connection = null
    this.channel = null
  }

  /**
   * Establishes a connection to RabbitMQ and creates a channel.
   * @throws {Error} If there is an issue connecting to RabbitMQ.
   */
  async connect() {
    try {
      this.connection = await amqp.connect({
        hostname: this.config.hostname,
        port: this.config.port,
        username: this.config.username,
        password: this.config.password,
      })

      logger.info('Connection established with RabbitMQ')

      this.channel = await this.connection.createChannel()

      logger.info('Channel created for RabbitMQ')
    } catch (error) {
      logger.error(`Error connecting to RabbitMQ: ${error.message}`)
      throw error
    }
  }

  /**
   * Declares a durable queue on the RabbitMQ channel.
   * @throws {Error} If there is an issue creating the queue.
   */
  async declareQueue() {
    try {
      await this.channel.assertQueue(this.config.queueName, { durable: true })
      logger.info(`Queue '${this.config.queueName}' created for RabbitMQ`)
    } catch (error) {
      logger.error(`Error creating queue: ${error.message}`)
      throw error
    }
  }

  /**
   * Publishes a message to the specified RabbitMQ queue.
   * @param {object} message - The message to be sent to the queue.
   * @throws {Error} If there is an issue publishing the message.
   */
  async publishMessage(message) {
    try {
      await this.channel.sendToQueue(
        this.config.queueName,
        Buffer.from(JSON.stringify(message)),
        { persistent: true },
      )
      logger.info(`Message sent to Queue: ${this.config.queueName}`)
    } catch (error) {
      logger.error(`Error publishing message: ${error.message}`)
      throw error
    }
  }

  /**
   * Consumes messages from the specified RabbitMQ queue and invokes the provided callback.
   * @param {function} callback - Callback function to handle the received message.
   * @throws {Error} If there is an issue consuming messages.
   */
  async consume(callback) {
    try {
      await this.channel.consume(this.config.queueName, (message) => {
        if (message) {
          const content = JSON.parse(message.content.toString())
          logger.info(`Message received from Queue: ${this.config.queueName}`)
          callback(content)
          this.channel.ack(message)
        }
      })
    } catch (error) {
      logger.error(`Error consuming messages from ${this.config.queueName}`)
      throw error
    }
  }

  /**
   * Closes the RabbitMQ connection.
   */
  async close() {
    try {
      await this.connection.close()
      logger.info('Connection closed.')
    } catch (error) {
      logger.error(`Error closing connection: ${error.message}`)
    }
  }
}

module.exports = RabbitMQUtils
