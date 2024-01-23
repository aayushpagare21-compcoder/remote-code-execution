// Validation middleware
const ApiError = require('../utils/ApiError')
const validateRequest = (schema) => {
  return (req, res, next) => {
    // Validate the request body using the provided Joi schema
    const { error } = schema.validate(req.body)

    if (error) {
      throw new ApiError(400, error.details[0].message)
    }

    // If validation passes, call next to proceed to the next middleware
    next()
  }
}

module.exports = validateRequest
