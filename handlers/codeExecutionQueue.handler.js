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
   }
}

//TODO: specifying timeout while running code
const getRunCommand = (fileName, fileNameWithExtension, language) => {
  switch (language) {
    case SUPPORTED_LANGUAGES.CPP:
      return `${PATHS['OUTPUT']}/${fileName}`
    case SUPPORTED_LANGUAGES.JAVASCRIPT:
      return `node ${PATHS['SRC']}/${fileNameWithExtension}`
    case SUPPORTED_LANGUAGES.PYTHON:
      return `python3 ${PATHS['SRC']}/${fileNameWithExtension}`
  }
}

const isCompiledLanguage = (language) => {
  return [SUPPORTED_LANGUAGES.CPP].includes(language)
}
const compileAndRunCode = async (fileName, fileNameWithExtension, language) => {
  try {
    /*
        fileName: 123123123123
        fileNameWithExtension: 1123123123123123.cpp
        language: CPP
     */
    await execSync(getCompileCommand(fileName, fileNameWithExtension, language))
    return runCode(fileName, fileNameWithExtension, language)
  } catch (err) {
    logger.error(`${err} - in compilation of ${fileNameWithExtension}`)
    return {
      err: err
    }
  }
}

const runCode = async (fileName, fileNameWithExtension, language) => {
 try{
   /*
      fileName: 123123123123
      fileNameWithExtension: 1123123123123123.exe
      language: CPP
    */
   return execSync(getRunCommand(fileName, fileNameWithExtension, language))
 }catch(err) {
   logger.error(`${err} - in run of ${fileName || fileNameWithExtension}`)
   return {
     err: err
   }
 }
}
const executeCodeHandler = async (eventData) => {
  const { id, code, language } = eventData
  try {
    const fileNameWithExtension = `${id}${EXTENSIONS[language]}`
    //Create a file and store code in it
    await fs.writeFile(`${PATHS['SRC']}/${fileNameWithExtension}`, code)
    //Compile or run code
    const output = isCompiledLanguage(language)
      ? await compileAndRunCode(id, fileNameWithExtension, language)
      : await runCode(id, fileNameWithExtension, language)
    //TODO: STORE IN REDIS
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



