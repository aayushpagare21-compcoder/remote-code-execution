require('dotenv').config({ path: '.env' })

module.exports = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  QUEUE_HOST: process.env.QUEUE_HOST,
  QUEUE_PORT: process.env.QUEUE_PORT,
  QUEUE_NAME: process.env.OUEUE_NAME,
  QUEUE_USER_NAME: process.env.QUEUE_USER_NAME,
  QUEUE_USER_PASSWORD: process.env.QUEUE_USER_PASSWORD,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_HOST: process.env.REDIS_HOST,
}
