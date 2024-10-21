/* Import the configuration */
const config = require('./config/config');

/* Import the Express library and it's supporting libraries*/
const express = require('express');
const cors = require('cors');
const logging = require('./config/morgan');

/* Import the API Documentation utilizing swagger ui */
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

/* Import any routes we need */
const authRoutes = require('./routes/Auth/Auth.routes');

/* Create an instance of the app */
const app = express();

/* Assign the supporting libraries to the express app */
app.use(cors());

/* Set the options for handling JSON via the body of the request */
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/* Setup the logging for the app */
app.use(logging.accessRotate);
app.use(logging.consoleError);

/* Serve the Swagger Documentation */
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

/* Assign routes to the express app */
app.use(authRoutes);

/* export the app so it can be used in tests and the main app in the root directory */
module.exports = app;