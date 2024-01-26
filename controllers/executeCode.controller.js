const { TIME_OUT, QUEUE_NAME } = require('../utils/constants')
const { publishMessage, setUpRabbitMQ } = require('../config/rabbit-mq')
const logger = require('../config/winston')
const uuid = require('uuid')


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
    const uniqueSubmissionId = uuid.v4()
    await publishMessage(CHANNEL, QUEUE_NAME, { ...requestBody, timeOut: TIME_OUT, id: uniqueSubmissionId})
    return uniqueSubmissionId
}

module.exports = {
  executeCode
}