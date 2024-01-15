/*
    Configure express application for each server, by passing configurations
*/
const setUpExpress = ({ port, environment, logger }) => {
    const express = require('express')
    const app = express()
      
    app.listen(port || 3001, () => {
      logger.info(`Node ${environment} at port ${port}`)
    })
  }
  
  module.exports = setUpExpress
  