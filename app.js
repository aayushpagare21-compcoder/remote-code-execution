const express = require('express')
const { PORT, NODE_ENV } = require('./config/dotenv')
const logger = require('./config/winston')
const app = express()

const errorHandler = require('./middlewares/error.middleware')

const coreRoutes = require('./routes/v1/core.routes')
app.use('/api/v1', coreRoutes)

app.use(errorHandler)

app.listen(PORT || 3001, () => {
  logger.info(`Node ${NODE_ENV} server running at port ${PORT}`)
})
