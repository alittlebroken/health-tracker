const winston = require('winston');
const config = require('./config');

/* Create the default logging instance */
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp( { format: 'DD-MM-YYYY HH:mm:ss'}),
        winston.format.printf(info => `${info.timestamp} - ${info.level}: ${info.message}`)
    ),
    defaultMeta: { service: '[HealthTracker]' },
    transports: [
        new winston.transports.File({filename: 'logs/error.log', level: 'error'}),
        new winston.transports.File({filename: 'logs/combined.log'})
    ]
});

/* When not in production output any messages to the console */
if(config.NODE_ENV !== 'production'){
    logger.add( new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize( { all: true }),
            winston.format.timestamp( { format: 'DD-MM-YYYY HH:mm:ss'}),
            winston.format.printf(info => `${info.timestamp} - ${info.level}: ${info.message}`)
        ),
    }));
}

module.exports = logger;