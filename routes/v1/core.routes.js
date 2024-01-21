const express = require('express')
const ApiError = require('../../utils/ApiError')

// Create an Express router
const router = express.Router()

router.post('/execute-code', async (req, res, next) => {
  try {
    // Example: throw an ApiError for internal server error
    throw new ApiError(500, 'Internal Server Error')
  } catch (error) {
    // Pass the error to the next middleware for handling
    next(error)
  }
})

// Export the router for use in other parts of the application
module.exports = router

/**
 * @swagger
 * /api/v1/execute-code:
 *   post:
 *     summary: Executes client's code on the server.
 *     description: Takes source code and language and returns the result (output which is displayed in the terminal).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 required: true
 *                 description: The source code to run.
 *                 example: console.log('Hello World')
 *               language:
 *                 type: string
 *                 required: true
 *                 description: Programming language in which source code is written.
 *                 enum:
 *                   - JAVASCRIPT
 *                   - PYTHON
 *                   - JAVA
 *                   - CPP
 *     responses:
 *       200:
 *         description: Code successfully queued for submission.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ack:
 *                   type: string
 *                   description: The Acknowledgement message.
 *                   example: Your code is queued, results will be sent to you in few seconds.
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Bad request error message.
 *                   enum:
 *                     - Programming Language Not Supported.
 *                     - Time Limit Exceeded.
 *                   example: Programming Language Not Supported.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Internal server error message.
 *                   example: Server Facing Down Time.
 */

/**
 * @swagger
 * /api/v1/execute-code:
 *   post:
 *     summary: Executes client's code on the server.
 *     description: Takes source code and language and returns the result (output which is displayed in the terminal).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 required: true
 *                 description: The source code to run.
 *                 example: console.log('Hello World')
 *               language:
 *                 type: string
 *                 required: true
 *                 description: Programming language in which source code is written.
 *                 enum:
 *                   - JAVASCRIPT
 *                   - PYTHON
 *                   - JAVA
 *                   - CPP
 *     responses:
 *       200:
 *         description: Code successfully queued for submission.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ack:
 *                   type: string
 *                   description: The Acknowledgement message.
 *                   example: Your code is queued, results will be sent to you in few seconds.
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Bad request error message.
 *                   enum:
 *                     - Programming Language Not Supported.
 *                     - Time Limit Exceeded.
 *                   example: Programming Language Not Supported.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Internal server error message.
 *                   example: Server Facing Down Time.
 */
