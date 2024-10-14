/* Import the Express library and it's supporting libraries*/
const express = require('express');
const cors = require('cors');

/* Import any routes we need */

/* Create an instance of the app */
const app = express();

/* Assign the supporting libraries to the express app */
app.use(cors());

/* Assign routes to the express app */


/* export the app so it can be used in tests and the main app in the root directory */
module.exports = app;