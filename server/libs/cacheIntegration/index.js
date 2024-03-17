const redis = require('redis')
class RedisManager {
  constructor(config) {
    this.config = config
    this.client = null
  }
  async connect() {
    if (!this.client) {
      this.client = await redis.createClient({
        url: `redis://${this.config.host}:${this.config.port}`,
      })
      await this.client.connect()
    }
  }
  async set(key, value, expiresInSec) {
    await this.connect()
    await this.client.set(key, JSON.stringify(value))
    await this.client.expire(key, expiresInSec)
  }
  async get(key) {
    await this.connect()
    const value = await this.client.get(key)
    return JSON.parse(value)
  }
}

module.exports = RedisManager
