const { SERVERS } = require('./config/dotenv')
const logger = require('./config/winston')

//Building a node cluster 
const cluster = require('node:cluster')
cluster.setupPrimary({
  exec: 'app.js',
})

logger.info(`Load balancer with ${process.pid} is running`)

for (let i = 0; i < SERVERS; i++) {
  cluster.fork()
}

//If any server dies the restart it
cluster.on('exit', (worker) => {
  logger.warn(`Server with ${worker.process.pid} died. Restarting...`)
  cluster.fork()
})
