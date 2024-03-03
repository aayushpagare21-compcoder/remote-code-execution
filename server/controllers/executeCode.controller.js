const RabbitMQManager = require('../libs/queueIntegration')
const RedisManager = require('../libs/cacheIntegration')
const { REDIS_HOST, REDIS_PORT } = require('../libs/envIntegration')

const ApiError = require('../libs/utils/ApiError')
const { TIME_OUT, QUEUE_NAME } = require('../libs/utils/constants')

const uuid = require('uuid')

const rabbitMQ = new RabbitMQManager()
const redis = new RedisManager({
  host: REDIS_HOST,
  port: REDIS_PORT,
})
async function executeCode(requestBody) {
  const uniqueSubmissionId = uuid.v4()
  await rabbitMQ.publish(QUEUE_NAME, {
    ...requestBody,
    timeOut: TIME_OUT,
    id: uniqueSubmissionId,
  })
  return uniqueSubmissionId
}
async function getSubmission(requestBody) {
  const value = await redis.get(`submissions:${requestBody.submissionId}`)
  if (value === null || value === undefined) {
    throw new ApiError(
      404,
      `Submission Id ${requestBody.submissionId} not found.`,
    )
  }
  return value
}

module.exports = {
  executeCode,
  getSubmission,
}
