require('dotenv').config({ path: '.env' })
module.exports = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
}
