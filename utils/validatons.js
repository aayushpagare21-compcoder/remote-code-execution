const Joi = require('joi')
const { SUPPORTED_LANGUAGES } = require('./constants')
executeCodeRequestBodySchema = Joi.object({
  code: Joi.string().required().messages({
    'any.required': 'Code is required.',
  }),
  language: Joi.string()
    .valid(...Object.values(SUPPORTED_LANGUAGES))
    .required()
    .messages({
      'any.required': 'Programming Language is required.',
      'any.only': 'Programming Language not supported.',
    }),
})

module.exports = {
  executeCodeRequestBodySchema,
}