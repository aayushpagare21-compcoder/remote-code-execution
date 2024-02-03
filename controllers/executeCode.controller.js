const RabbitMQManager = require('../config/rabbit-mq')
const RedisManager = require('../config/redis')
const { REDIS_HOST, REDIS_PORT } = require('../config/dotenv')

const ApiError = require('../utils/ApiError')
const { TIME_OUT, QUEUE_NAME } = require('../utils/constants')

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
  const value = await redis.get(requestBody.submissionId)
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
