const devLogger = require('./development.logger')
const prodLogger = require('./production.logger')
const { NODE_ENV } = require('../dotenv')

let logger = devLogger()
switch (NODE_ENV) {
  case 'development': {
    logger = devLogger()
    break
  }
  case 'production': {
    logger = prodLogger()
    break
  }
}

module.exports = logger
