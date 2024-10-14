require('dot-env').config()

/* Import the correct environmental vars needed */

module.exports = {
    APP_PORT: process.env.APP_PORT,
}