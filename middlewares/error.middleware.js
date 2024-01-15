
const logger = require("../config/winston");

const errorHandler = (err, _req, res, next) => {
  // default HTTP status code and error message
  let httpStatusCode = err?.status || 500;
  let message = err?.message || "Internal Server Error";

  // logg the error
  logger.error(`${httpStatusCode} - ${message}`)

  // return the standard error response
  res.status(httpStatusCode).send({
    error: {
      message: message,
    },
  });

  return next(err);
} 

module.exports = errorHandler