/*
    Configure express application for each server, by passing configurations
*/
const setUpExpress = ({ port, environment, logger }) => {
  const express = require('express')
  const app = express()

  const errorHandler = require('./middlewares/error.middleware')
  
  const coreRoutes = require('./routes/v1/core.routes') 
  app.use('/api/v1', coreRoutes)

  app.use(errorHandler)

  app.listen(port || 3001, () => {
    logger.info(`Node ${environment} at port ${port}`)
  })
}

module.exports = setUpExpress
