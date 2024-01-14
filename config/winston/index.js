const devLogger = require('./development.logger')
const prodLogger = require('./production.logger')

let logger = null
switch (process.env.NODE_ENV) {
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
