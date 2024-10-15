require('dotenv').config();

/* Import the correct environmental vars needed */
/* Base application config */
const APP_PORT = process.env.APP_PORT;

/* Logging config */
const LOG_ACCESS_LOC = process.env.LOG_ACCESS_LOC;

/* Database connection information */
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

module.exports = {
    APP_PORT,
    LOG_ACCESS_LOC,
    DB_USER,
    DB_PASS,
    DB_NAME,
    DB_HOST,
    DB_PORT
}