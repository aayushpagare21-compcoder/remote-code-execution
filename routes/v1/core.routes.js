const express = require('express')
const { executeCodeRequestBodySchema } = require('../../utils/validatons')
const ApiError = require('../../utils/ApiError')
const validateRequest = require('../../middlewares/validation.middleware')
const { executeCode } = require('../../controllers/executeCode.controller')
const logger = require('../../config/winston')

// Create an Express router
const router = express.Router()

router.post(
  '/execute-code',
  validateRequest(executeCodeRequestBodySchema),
  async (req, res, next) => {
    try {
      const submissionId = await executeCode(req.body)
      res.json({
        id: submissionId
      })
    } catch (err) {
      logger.error(`${err} - Error in execute code API Call`)
      next(new ApiError(500, err.message))
    }
  },
)

// Export the router for use in other parts of the application
module.exports = router

