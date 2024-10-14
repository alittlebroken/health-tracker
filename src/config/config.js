require('dotenv').config()

/* Import the correct environmental vars needed */

module.exports = {
    APP_PORT: process.env.APP_PORT,
    LOG_ACCESS_LOC: process.env.LOG_ACCESS_LOC
}