const express = require('express')
const ApiError = require('../../utils/ApiError')
const router = express.Router()

router.get('/', (req, res, next) => {
  throw new ApiError(404, 'To be implemented now')
})

module.exports = router
