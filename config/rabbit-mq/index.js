const {
  QUEUE_HOST,
  QUEUE_PORT,
  QUEUE_USER_NAME,
  QUEUE_USER_PASSWORD,
} = require('../dotenv')
const amqp = require('amqplib')
const logger = require('../winston')

async function connect() {
  try {
    return amqp.connect({
      hostname: QUEUE_HOST,
      port: QUEUE_PORT,
      username: QUEUE_USER_NAME,
      password: QUEUE_USER_PASSWORD,
    })
  } catch (error) {
    logger.error(`Error connecting to RabbitMQ: ${error.message}`)
    throw error
  }
}

async function createChannel(connection) {
  try {
    return connection.createChannel()
  } catch (error) {
    logger.error(`Error creating channel: ${error.message}`)
    throw error
  }
}

async function declareQueue(queueName, channel) {
  try {
    return channel.assertQueue(queueName, { durable: true })
  } catch (error) {
    logger.error(`Error creating queue: ${error.message}`)
    throw error
  }
}

async function publishMessage(channel, queueName, message) {
  try {
    return channel.sendToQueue(
      queueName,
      Buffer.from(JSON.stringify(message)),
      {
        persistent: true,
      },
    )
  } catch (error) {
    logger.error(`Error publishing message: ${error.message}`)
    throw error
  }
}

async function consume(channel, queueName, callback) {
  try {
    return channel.consume(queueName, (message) => {
      if (message) {
        const content = JSON.parse(message.content.toString())
        callback(content)
        channel.ack(message)
      }
    })
  } catch (error) {
    logger.error(
      `Error consuming messages from ${queueName} : ${error.message}`,
    )
    throw error
  }
}

async function close(connection) {
  try {
    return connection.close()
  } catch (error) {
    logger.error(`Error closing connection: ${error.message}`)
  }
}

async function setUpRabbitMQ(queueName) {
  const connection = await connect()
  const channel = await createChannel(connection)
  await declareQueue(queueName, channel)

  return channel
}

module.exports = {
  setUpRabbitMQ,
  publishMessage,
  consume,
}
