/* Import the required libraries */
const express = require('express');
const router = express.Router()

/* Import the routes controllers */
const controller = require('../../controllers/Auth/Auth.controller.js');

/* Import any middleware */


/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Rgisters a user for use within the Health Tracker system
 */
router.post('/register', controller.Register);

module.exports = router;