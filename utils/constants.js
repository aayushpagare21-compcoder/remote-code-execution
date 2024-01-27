const SUPPORTED_LANGUAGES = {
  JAVASCRIPT: 'JAVASCRIPT',
  PYTHON: 'PYTHON',
  CPP: 'CPP',
}

const TIME_OUT = 5000

const QUEUE_NAME = 'CODE_EXECUTION_QUEUE'

const EXTENSIONS = {
  [SUPPORTED_LANGUAGES.JAVASCRIPT]: '.js',
  [SUPPORTED_LANGUAGES.PYTHON]: '.py',
  [SUPPORTED_LANGUAGES.CPP]: '.cpp',
}

const PATHS = {
  SRC: `${process.cwd()}/files/src`,
  RESULTS: `${process.cwd()}/files/results`,
  OUTPUT: `${process.cwd()}/files/outputs`,
}

module.exports = {
  SUPPORTED_LANGUAGES,
  TIME_OUT,
  QUEUE_NAME,
  EXTENSIONS,
  PATHS,
}
