const amqp = require('amqplib')
const {
  QUEUE_HOST,
  QUEUE_PORT,
  QUEUE_USER_NAME,
  QUEUE_USER_PASSWORD,
} = require('../envIntegration')

class RabbitMQManager {
  constructor() {
    this.channel = null
    this.connection = null
  }
  async connect() {
    this.connection = await amqp.connect({
      hostname: QUEUE_HOST,
      port: QUEUE_PORT,
      username: QUEUE_USER_NAME,
      password: QUEUE_USER_PASSWORD,
    })

    return this.connection
  }
  async createChannel() {
    if (this.connection === null) {
      throw new Error('Connection is required first to create a channel')
    }
    this.channel = await this.connection.createChannel()
    return this.channel
  }
  async declareQueue(queueName) {
    if (this.channel === null) {
      throw new Error('Channel is required first to create a queue')
    }
    await this.channel.assertQueue(queueName, { durable: true })
  }
  async publishMessage(queueName, message) {
    return this.channel.sendToQueue(
      queueName,
      Buffer.from(JSON.stringify(message)),
      {
        persistent: true,
      },
    )
  }
  async consume(queueName, callback) {
    return this.channel.consume(queueName, (message) => {
      if (message) {
        const content = JSON.parse(message.content.toString())
        callback(content)
        this.channel.ack(message)
      }
    })
  }
  async publish(queueName, message) {
    if (this.connection === null) {
      await this.connect()
      await this.createChannel()
      await this.declareQueue(queueName)
      await this.publishMessage(queueName, message)
      return
    }
   
    await this.publishMessage(queueName, message)
  }
  async listenToQueue(queueName, handler) {
    if (this.connection === null) {
      await this.connect()
      await this.createChannel()
      await this.declareQueue(queueName)
      await this.consume(queueName, handler)
    } 
  }
}

module.exports = RabbitMQManager
