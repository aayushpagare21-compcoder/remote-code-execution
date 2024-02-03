const { PORT, NODE_ENV } = require('./config/dotenv')
const logger = require('./config/winston')
const RabbitMQManager = require('./config/rabbit-mq')

const executeCodeHandler = require('./handlers/codeExecutionQueue.handler')

const errorHandler = require('./middlewares/error.middleware')

const coreRoutes = require('./routes/v1/core.routes')

const { QUEUE_NAME } = require('./utils/constants')

const express = require('express')
const fs = require('fs')

const rabbitMQ = new RabbitMQManager()
rabbitMQ
  .listenToQueue(QUEUE_NAME, executeCodeHandler)
  .then(() => {
    logger.info(`listening to queue ${QUEUE_NAME}`)
  })
  .catch((err) => {
    logger.error(`${err} - error listening to queue ${QUEUE_NAME}`)
  })

const app = express()
app.use(express.json())
app.use('/api/v1', coreRoutes)
app.use(errorHandler)
app.listen(PORT || 3001, () => {
  logger.info(`Node ${NODE_ENV} server running at port ${PORT || 3001}`)
})
