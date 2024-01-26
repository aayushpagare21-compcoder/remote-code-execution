const { consume, setUpRabbitMQ } = require('../config/rabbit-mq')
const { QUEUE_NAME } = require('../utils/constants')
const logger = require('../config/winston')
const fs = require('fs/promises')

//TODO : Complete this
const executeCodeHandler = async (params) => {
  try{
    //Create a file and store code in it
    //await fs.writeFile(`${process.cwd()}/files/${id}`, code)
  } catch(err) {
    logger.error(`Error executing code in handler for submission ${id} ${err}`)
  }
}

setUpRabbitMQ(QUEUE_NAME)
  .then((channel) => {
    consume(channel, QUEUE_NAME, executeCodeHandler).then().catch((err) => {
      logger.error(`Error consuming messages : ${err} ${QUEUE_NAME}`)
    })
  })
  .catch((err) => {
    logger.error(`error setup rabbit-mq ${err}`)
  }).catch((err) => {
    logger.error(`Error setting up Rabbit MQ ${err}`)
})



