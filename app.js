const express = require('express')
const swaggerUI = require('swagger-ui-express')
const swaggerSpec = require('./config/swagger')

const { PORT, NODE_ENV } = require('./config/dotenv')
const logger = require('./config/winston')
const errorHandler = require('./middlewares/error.middleware')
const coreRoutes = require('./routes/v1/core.routes')

//Create express app
const app = express()
//Parse the request to json
app.use(express.json())
// Set up routes for version 1 of the API under the '/api/v1' path
app.use('/api/v1', coreRoutes)
//Swagger: View api-docs
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
// Use the errorHandler middleware to handle errors in the application
app.use(errorHandler)
// Start the Express server and listen on the specified port (or default to 3001)
app.listen(PORT || 3001, () => {
  logger.info(`Node ${NODE_ENV} server running at port ${PORT}`)
})
