const express = require('express')

const { PORT, NODE_ENV } = require('./config/dotenv')
const logger = require('./config/winston/index.js')
const app = express()

app.listen(PORT || 3001, () => {
  logger.info(`Node ${NODE_ENV} at port ${PORT}`)
})
