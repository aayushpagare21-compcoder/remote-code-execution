const { PORT, NODE_ENV } = require('./config/dotenv/index.js')
const logger = require('./config/winston/index.js')  

//Building a node cluster for parelleism
const cluster = require('cluster');
const os = require('os');  

const setUpExpress = require('./config/configureApp.js');
const cores = os.cpus().length  

//If master process, then code for load balancers, start more node instances
if(cluster.isMaster) { 
    logger.info(`Master process with ${process.pid} is running`) 

    for(let i = 0; i < cores; i++) { 
        cluster.fork()
    } 

    //If any server dies the restart it
    cluster.on('exit', (worker) => {
        logger.warn((`Worker process ${worker.process.pid} died. Restarting...`))
        cluster.fork();
      });
} else { 
    //If not master process, then code for node servers
    setUpExpress({port: PORT, environment: NODE_ENV, logger: logger})
}
