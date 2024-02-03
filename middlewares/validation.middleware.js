const ApiError = require('../utils/ApiError')

const { pick, keys } = require('lodash')
const Joi = require('joi')

const validateRequest = (schema) => {
  return (req, res, next) => {
    const validationSchema = pick(schema, ['body', 'query', 'params'])
    const object = pick(req, keys(validationSchema))
    const { error } = Joi.compile(validationSchema)
      .prefs({ errors: { label: 'key' } })
      .validate(object)
    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(', ')

      next(new ApiError(400, errorMessage))
    }
    next()
  }
}

module.exports = validateRequest
