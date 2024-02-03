const { SUPPORTED_LANGUAGES } = require('./constants')

const Joi = require('joi')

const executeCodeRequestSchema = {
  body: Joi.object().keys({
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
  }),
}

const getSubmissionSchema = {
  params: Joi.object().keys({
    submissionId: Joi.string().required().messages(
      {
        'any.required': 'Submission Id is required.',
      }
    ),
  }),
}

module.exports = {
  executeCodeRequestBodySchema: executeCodeRequestSchema,
  getSubmissionSchema: getSubmissionSchema,
}
