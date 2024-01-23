const swaggerJsdoc = require('swagger-jsdoc')
const logger = require('./config/winston')

// Log information about generating the Swagger spec.
logger.info('generating swagger spec.')

// Define options for the Swagger specification.
const options = {
  definition: {
    failOnErrors: true,
    openapi: '3.0.0', // OpenAPI version
    info: {
      title: 'Codex APIs',
      version: '1',
      description: 'APIs we expose to interact with our engine',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/v1/*.js'], // Path to the API routes that should be included in the documentation
}

// Generate the Swagger specification using swagger-jsdoc.
const swaggerSpec = swaggerJsdoc(options)

// Export the generated Swagger specification.
module.exports = swaggerSpec
