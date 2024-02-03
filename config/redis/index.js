const redis = require('redis')
const logger = require('../winston')
class RedisManager {
  constructor(config) {
    this.config = config
    this.client = null
  }
  async connect() {
    if (!this.client) {
      this.client = await redis.createClient(this.config)
      await this.client.connect()
    }
  }
  async set(key, value) {
    await this.connect()
    await this.client.set(key, JSON.stringify(value))
  }
  async get(key) {
    await this.connect()
    const value = await this.client.get(key)
    return JSON.parse(value)
  }
}

module.exports = RedisManager
