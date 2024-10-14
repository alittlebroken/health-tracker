const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const config = require('./config');

/* Setup the stream for the access log */
const accessRfs = rfs.createStream('access.log', {
    interval: '1d',
    path: config.LOG_ACCESS_LOC
})

/* set up the error console reporting */
const consoleError = { skip: (req, res) => res.statusCode < 400 }

module.exports = {
    accessRotate: morgan('common', { stream: accessRfs}),
    consoleError: morgan('dev', consoleError),
};