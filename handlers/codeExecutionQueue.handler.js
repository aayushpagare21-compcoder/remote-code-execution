const { REDIS_HOST, REDIS_PORT } = require('../config/dotenv')
const RedisManager = require('../config/redis')
const logger = require('../config/winston')

const { SUPPORTED_LANGUAGES, EXTENSIONS, PATHS } = require('../utils/constants')

const fs = require('fs/promises')
const { exec } = require('child_process')
const { promisify } = require('util')

const execSync = promisify(exec)
const redis = new RedisManager({
  host: REDIS_HOST,
  port: REDIS_PORT,
})

const getCompileCommand = (fileName, language) => {
  switch (language) {
    case SUPPORTED_LANGUAGES.CPP:
      return `g++ ${PATHS.SRC}/${fileName}${EXTENSIONS.CPP} -o ${PATHS.OUTPUT}/${fileName}`
  }
}
const getRunCommand = (fileName, language) => {
  switch (language) {
    case SUPPORTED_LANGUAGES.CPP:
      return `${PATHS.OUTPUT}/${fileName}`
    case SUPPORTED_LANGUAGES.JAVASCRIPT:
      return `node ${PATHS.SRC}/${fileName}`
    case SUPPORTED_LANGUAGES.PYTHON:
      return `python3 ${PATHS.SRC}/${fileName}`
  }
}
const isCompiledLanguage = (language) => {
  return [SUPPORTED_LANGUAGES.CPP].includes(language)
}
const compileAndRunCode = async (fileName, language) => {
  try {
    await execSync(getCompileCommand(fileName, language))
    return runCode(fileName, language)
  } catch (err) {
    logger.error(`${err} - compile - for ${language} - id ${fileName}`)
    return {
      err: err.stderr,
    }
  }
}
const runCode = async (fileName, language) => {
  try {
    return await execSync(getRunCommand(fileName, language))
  } catch (err) {
    logger.error(`${err} - run - for ${language} - id ${fileName}`)
    return {
      err: err.stderr,
    }
  }
}
const executeCodeHandler = async (eventData) => {
  try {
    const { id, code, language } = eventData
    const fileNameWithExtension = `${id}${EXTENSIONS[language]}`
    const sourceFilePath = `${PATHS.SRC}/${fileNameWithExtension}`
    const outputFilePath = `${PATHS.OUTPUT}/${fileNameWithExtension}`
    const isLangCompiled = isCompiledLanguage(language)
    //Create a file and store code in it
    await fs.writeFile(sourceFilePath, code)
    //Compile or run code
    const output = isLangCompiled
      ? await compileAndRunCode(id, language)
      : await runCode(id, language)

    const result = output.err
      ? {
          error: output.err.stderr,
        }
      : {
          output: output.stdout,
        }
    //set results in redis
    await redis.set(id, result)
    //Delete the source and output file
    await fs.unlink(sourceFilePath)
    //Delete the output file (if it's a compiled language)
    isLangCompiled && (await fs.unlink(outputFilePath))
  } catch (err) {
    logger.error(`${err} - Error in code execution queue handle`)
  }
}

module.exports = executeCodeHandler
