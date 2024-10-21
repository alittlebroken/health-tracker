/* Packages */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* Custom packages */
const db = require('../db/database');
const config = require('../config/config');
const logger = require('../config/winston');

/**
 * Register a user within the database
 * @param {string} email - The email address for the user being registered
 * @param {string} password - The password the registering user wishes to use for their account
 * 
 */
const registerUser = async (email, password) => {

    try {

        /* Validate the passed in arguments */
        if(!email || typeof email !== 'string' || email === ''){
            logger.log('error', `[Auth Service] -> registerUser: The supplied email was not correct or missing.`);
            return {
                message: 'Email address is missing or incorrect',
                results: []
            }
        }

        if(!password || typeof password !== 'string' || password === ''){
            logger.log('error', `[Auth Service] -> registerUser: The supplied password was not correct or missing.`);
            return {
                message: 'Password is missing or incorrect',
                results: []
            }
        }

        /* hash the provided password */
        const hashedPass = await bcrypt.hash(password, parseInt(config.SEC_SALT_ROUNDS));

        /* Save the user in the database */
        const sqlCmd = "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email;";
        const sqlValues = [email, hashedPass];

        const result = await db.query(sqlCmd, sqlValues);

        /* Ensure the creation was OK */
        if(!result || result.rows.length <= 0){
            logger.log('error', `[Auth Service] -> registerUser: Either no result or an error was passed back by the DB.`);
            return {
                message: 'There was a probem with the server',
                results: []
            }
        };

        /* Assume at this point all is ok and send the details back */
        return {
            message: 'Registration successful',
            results: result.rows
        };

    } catch(error) {

        /* Log the error to the log file */
        logger.log('error', `[Auth Service] -> registerUser: ${error.message}`);

        return {
            message: 'There was a problem with the server',
            results: []
        }

    }

};


/* export the methods we need */
module.exports  = {
    registerUser,
};