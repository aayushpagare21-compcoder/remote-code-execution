/**
 * Custom error class for representing API errors with HTTP status codes.
 *
 * @class ApiError
 * @extends {Error}
 */
class ApiError extends Error {
  /**
   * Creates an instance of ApiError.
   * @param {number} status - HTTP status code associated with the error.
   * @param {string} message - Error message providing additional details about the error.
   */
  constructor(status, message) {
    super(message)

    /**
     * HTTP status code associated with the error.
     * @type {number}
     */
    this.status = status
  }
}

module.exports = ApiError
