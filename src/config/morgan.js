const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const path = require('path');

/* Setup the stream for the access log */
const accessRfs = rfs.createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, '../logs')
})

/* set up the error console reporting */
const consoleError = { skip: (req, res) => res.statusCode < 400 }

module.exports = {
    accessRotate: morgan('common', { stream: accessRfs}),
    consoleError: morgan('dev', consoleError),
};