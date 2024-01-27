const { consume, setUpRabbitMQ } = require('../config/rabbit-mq')
const {
  QUEUE_NAME,
  SUPPORTED_LANGUAGES,
  EXTENSIONS,
  PATHS,
} = require('../utils/constants')
const logger = require('../config/winston')
const fs = require('fs/promises')
const { exec } = require('child_process')
const { promisify } = require('util')

const execSync = promisify(exec)
const getCompileCommand = (fileName, fileNameWithExtension, language) => {
  switch (language) {
    case SUPPORTED_LANGUAGES.CPP:
      return `g++ ${PATHS['SRC']}/${fileNameWithExtension} -o ${PATHS['OUTPUT']}/${fileName}`
    case SUPPORTED_LANGUAGES.JAVA:
      return `javac -d ${PATHS['OUTPUT']} ${fileNameWithExtension}`
  }
}
const isCompiledLanguage = (language) => {
  return [SUPPORTED_LANGUAGES.CPP, SUPPORTED_LANGUAGES.JAVA].includes(language)
}
const compileAndRunCode = async (fileName, fileNameWithExtension, language) => {
  try {
    await execSync(getCompileCommand(fileName, fileNameWithExtension, language))
  } catch (err) {
    logger.error(`${err} - in compilation of ${fileNameWithExtension}`)
  }
}
//TODO: To be implemented
const runCode = () => {}
const executeCodeHandler = async (eventData) => {
  const { id, code, language } = eventData
  try {
    const fileNameWithExtension = `${id}${EXTENSIONS[language]}`
    //Create a file and store code in it
    await fs.writeFile(`${PATHS['SRC']}/${fileNameWithExtension}`, code)
    //Compile or run code
    const output = isCompiledLanguage(language)
      ? await compileAndRunCode(id, fileNameWithExtension, language)
      : await runCode(id, language)
  } catch (err) {
    logger.error(`Error executing code in handler for submission ${id} ${err}`)
  }
}

setUpRabbitMQ(QUEUE_NAME)
  .then((channel) => {
    consume(channel, QUEUE_NAME, executeCodeHandler)
      .then()
      .catch((err) => {
        logger.error(`Error consuming messages : ${err} ${QUEUE_NAME}`)
      })
  })
  .catch((err) => {
    logger.error(`error setup rabbit-mq ${err}`)
  })
  .catch((err) => {
    logger.error(`Error setting up Rabbit MQ ${err}`)
  })



