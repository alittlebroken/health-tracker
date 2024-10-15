const swaggerJSDOC = require('swagger-jsdoc');

/* set up the definition for the swagger docs */
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Health Tracker API',
        version: '1.0.0',
        description: 'API for the Health Tracker application',
    },
};

/* Some swagger Options like specifying the routes to apply it to */
const swaggerOptions = {
    swaggerDefinition,
    apis: [
        './routes/*.js'
    ]
};

/* Create the spec to then export */
const swaggerSpec = swaggerJSDOC(swaggerOptions);
module.exports = swaggerSpec;