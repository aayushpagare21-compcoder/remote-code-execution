const { SERVERS, NODE_ENV } = require('./config/dotenv')
const logger = require('./config/winston')

// Building a node cluster
const cluster = require('node:cluster')

// Set up the primary process with the specified 'app.js' file as the entry point
cluster.setupPrimary({
  exec: 'app.js',
})

// Log information about the load balancer
logger.info(`Load balancer with ${process.pid} is running`)

// Fork worker processes based on the number of servers specified
for (let i = 0; i < SERVERS; i++) {
  cluster.fork()
}

// If any server dies, restart it
if (NODE_ENV === 'production') {
  cluster.on('exit', (worker) => {
    logger.warn(`Server with ${worker.process.pid} died. Restarting...`)
    cluster.fork()
  })
}
