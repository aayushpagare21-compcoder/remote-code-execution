const logger = require('../../config/winston')

const {
  executeCode,
  getSubmission,
} = require('../../controllers/executeCode.controller')

const validateRequest = require('../../middlewares/validation.middleware')

const {
  executeCodeRequestBodySchema,
  getSubmissionSchema,
} = require('../../utils/validatons')

const express = require('express')

const router = express.Router()

router.post(
  '/submission',
  validateRequest(executeCodeRequestBodySchema),
  async (req, res, next) => {
    try {
      const submissionId = await executeCode(req.body)
      res.json({
        id: submissionId,
      })
    } catch (err) {
      logger.error(`${err.message} - Error in ${req.path}.`)
      next(err.message)
    }
  },
)

router.get(
  '/submission/:submissionId',
  validateRequest(getSubmissionSchema),
  async (req, res, next) => {
    try {
      const result = await getSubmission(req.params)
      res.status(200).json(result)
    } catch (err) {
      logger.error(`${err.message} - Error in ${req.path}.`)
      next(err)
    }
  },
)

module.exports = router
