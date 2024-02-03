const logger = require('../config/winston')

const errorHandler = (err, _req, res, _next) => {
  let httpStatusCode = err?.status || 500
  let message = err?.message || 'Internal Server Error'
  logger.error(`${httpStatusCode} - ${message}`)
  res.status(httpStatusCode).send({
    error: {
      message: message,
    },
  })
}

module.exports = errorHandler
