/* Import the required libraries */
const express = require('express');
const router = express.Router()

/* Import the routes controllers */
const controller = require('../../controllers/Auth.controller.js');

/* Import any middleware */


/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Rgisters a user for use within the Health Tracker system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: The user's email address
 *                   example: user.new@textcompany.org
 *                 password:
 *                   type: string
 *                   description: The password the user wishes to have for thier account
 *                   example: Ex4mpl3P455w0RD!
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: The status code of the response
 *                   example: 201
 *                 state:
 *                   type: string
 *                   description: Wether the request was a success or failure
 *                   example: ok
 *                 message:
 *                   type: string
 *                   description: Details the request state with more information
 *                   example: User registered
 *                 results:
 *                   type: array
 *                   description: A list of the users registered
 *                   example: [{ id: 1, email: 'user.new@textcompany.org' }]
 */
router.post('/register', controller.registerUser);

module.exports = router;