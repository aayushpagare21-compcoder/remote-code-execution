const { PORT, NODE_ENV } = require('./libs/envIntegration')
const logger = require('./libs/loggerIntegration')

const errorHandler = require('./middlewares/error.middleware')

const coreRoutes = require('./routes/v1/core.routes')

const express = require('express')

const app = express()
app.use(express.json())
app.use('/api/v1', coreRoutes)
app.use(errorHandler)
app.listen(PORT || 3001, () => {
  logger.info(`Node ${NODE_ENV} server running at port ${PORT || 3001}`)
})
