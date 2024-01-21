const express = require('express')
const Joi = require('joi');

const ApiError = require('../../utils/ApiError')
const logger = require('../../config/winston')
const { SUPPORTED_LANGUAGES } = require('../../utils/constants')
const validateRequest = require('../../middlewares/validation.middleware')

// Create an Express router
const router = express.Router()

/*
    - Schema Declarations
*/
const executeCodeRequestBodySchema = Joi.object({
  code: Joi.string().required().messages({
    'any.required': 'Code is required.'
  }),
  language: Joi.string()
    .valid(...Object.values(SUPPORTED_LANGUAGES))
    .required()
    .messages({
      'any.required': 'Programming Language is required.',
      'any.only': 'Programming Language not supported.'
    })
});

/*
    - Route declarations
*/
router.post('/execute-code', validateRequest(executeCodeRequestBodySchema), async (req, res, next) => {
  try {
    res.json({message: "Your code is queued, results will be sent to you in few seconds."})
  } catch (error) {
    // Pass the error to the next middleware for handling
    next(error)
  }
})

// Export the router for use in other parts of the application
module.exports = router

/*
  - JS DOC
*/
/**
 * @swagger
 * components:
 *   schemas:
 *     ExecuteCodeAPIRequestBody:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *           required: true
 *           description: The source code to run.
 *         language:
 *           type: string
 *           required: true
 *           description: Programming language in which the source code is written.
 *           enum:
 *             - JAVASCRIPT
 *             - PYTHON
 *             - JAVA
 *             - CPP

 *     ExecuteCodeRequestAPISuccessResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: The message content.

 *     ExecuteCodeRequestAPIErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Error message content.

 * /api/v1/execute-code:
 *   post:
 *     summary: Executes client's code on the server.
 *     description: Takes source code and language and returns the result (output displayed in the terminal).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExecuteCodeAPIRequestBody'
 *           examples:
 *             example1:
 *               value:
 *                 code: console.log('Hello world')
 *                 language: JAVASCRIPT
 *     responses:
 *       200:
 *         description: Code successfully queued for submission.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExecuteCodeRequestAPISuccessResponse'
 *             example:
 *               message: Your code is queued, results will be sent to you in a few seconds.
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExecuteCodeRequestAPIErrorResponse'
 *             examples:
 *               example1:
 *                 value:
 *                   error:
 *                     message: Time limit exceeded.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExecuteCodeRequestAPIErrorResponse'
 *             examples:
 *               example1:
 *                 value:
 *                   error:
 *                     message: Internal server error
 */


