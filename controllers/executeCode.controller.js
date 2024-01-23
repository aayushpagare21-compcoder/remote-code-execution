const { TIME_OUT, QUEUE_NAME } = require('../utils/constants')
const { publishMessage, setUpRabbitMQ } = require('../config/rabbit-mq')
const logger = require('../config/winston')


//Rabbit-MQ setup
let CHANNEL
setUpRabbitMQ(QUEUE_NAME)
  .then((channel) => {
    CHANNEL = channel
  })
  .catch((err) => {
    logger.error(`error setup rabbit-mq ${err}`)
  })

async function executeCode(requestBody){
    await publishMessage(CHANNEL, QUEUE_NAME, { ...requestBody, timeOut: TIME_OUT})
}

module.exports = {
  executeCode
}