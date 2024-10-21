/* Import the service to be used for this controller */
const authService = require('../services/Auth.service.js');

/**
 * Registers a user
 * Handles all logic pertaining to creation of a new user
 */
const registerUser = async (req, res) => {

    /* Wrap all processing within a try catch block */
    try{

        /* Validate the parameters passed in via the request body */
        const { email, password } = req.body;

        if(email === '' || typeof email !== 'string'){
            return res.status(404).json({
                status: 404,
                state: 'failure',
                message: 'Email address is missing or incorrect',
                results: []
            })
        }

        if(password === '' || typeof password !== 'string'){

            return res.status(404).json({
                status: 404,
                state: 'failure',
                message: 'Password is missing or incorrect',
                results: []
            })

        }

        /* Create the user */
        const result = await authService.registerUser(email, password);
        
        /* Check the result sent back */
        if(!result || result.results.length < 1){
            return res.status(500).send({
                status: 500,
                state: 'failure',
                message: 'There was a problem with the server',
                results: []
            });
        }

        /* Send the actual result back */
        return res.status(201).json({
            status: 201,
            state: 'ok',
            message: 'Registration successful',
            results: result.results
        });

    } catch (error) {

        return res.status(500).json({
            status: 500,
            state: 'failure',
            message: "There was a problem with the server",
            results: []
        })

    }
    
}

/* Export the methods required */
module.exports = {
    registerUser,
}