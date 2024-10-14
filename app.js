/* Import the express app and it's config and routes */
const app = require('./src/server');

/* Import any config */
const config = require('./src/config/config');

/* Start up the server */
app.listen(config.APP_PORT, (err) => {
    if (err) console.log("There was an issue starting the server.");

    console.log(`Server started on port ${config.APP_PORT}`);
})