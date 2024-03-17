const { PORT, NODE_ENV } = require('./libs/envIntegration')
const logger = require('./libs/loggerIntegration')

const errorHandler = require('./middlewares/error.middleware')

const coreRoutes = require('./routes/v1/core.routes')

const express = require('express')

const app = express()
app.use(express.json())
app.use('/api/v1', coreRoutes)
app.get('/', (req, res) => {
  res.send('Endpoint test successfully completed.')
})

app.use(errorHandler)
app.listen(PORT, () => {
  logger.info(`Node ${NODE_ENV} server running at port ${PORT}`)
})
