require('dotenv').config();

/* Import the correct environmental vars needed */

module.exports = {
    APP_PORT: process.env.APP_PORT,
    LOG_ACCESS_LOC: process.env.LOG_ACCESS_LOC,
    DB_PASS: process.env.DB_PASS,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT,
    DB_HOST: process.env.DB_HOST
}