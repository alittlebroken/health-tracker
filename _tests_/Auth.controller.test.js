const supertest = require('supertest');
const app = require('../src/server');
const db = require('../src/db/database');

const api = supertest(app);

const controller = require('../src/controllers/Auth.controller');
const service = require('../src/services/Auth.service.js');

describe('Authentication controller', () => {

    describe('RegisterUser', () => {

        beforeEach(() => {
            /* reset any jest mocks used for testing */
            jest.clearAllMocks();
        })

        it('should send status 201 and a success message via the res object', async () => {

            /* Mock any calls being made */
            jest.spyOn(db, 'query').mockImplementation(() => {
                return {
                    rows: [
                        { id: 1, email: 'user.new@textcompany.org'}
                    ]
                }
            });

            /* Mock the req and res objects */
            const mRes = {
                body: {
                    email: 'user.new@textcompany.org',
                    password: 'l3tm31nPl34s3!!'
                }
            }
            const mReq = {
                status: jest.fn().mockReturnThis(), json: jest.fn()
            }

            /* Execute the controllers method */
            await controller.registerUser(mRes, mReq);

            /* Set the expected values to be returned */
            const expectedStatus = 201;
            const expectedReturnValues = {
                status: 201,
                state: 'ok',
                message: 'Registration successful',
                results: [
                    { id: 1, email: 'user.new@textcompany.org'}
                ]
            };

            /* Check the results of running the test are as we expect them to be */
            expect(mReq.status).toHaveBeenCalledWith(expectedStatus);
            expect(mReq.json).toHaveBeenCalledWith(expectedReturnValues);


        }); // End of test

        it('should send status 404 and a failure message if the email address is missing or incorrect', async () => {

            /* Mock any calls being made */
            jest.spyOn(db, 'query').mockImplementation(() => {
                return {
                    rows: []
                }
            });

            /* Mock the req and res objects */
            const mRes = {
                body: {
                    email: '',
                    password: 'l3tm31nPl34s3!!'
                }
            }
            const mReq = {
                status: jest.fn().mockReturnThis(), json: jest.fn()
            }

            /* Execute the controllers method */
            await controller.registerUser(mRes, mReq);

            /* Set the expected values to be returned */
            const expectedStatus = 404;
            const expectedReturnValues = {
                status: 404,
                state: 'failure',
                message: 'Email address is missing or incorrect',
                results: []
            };

            /* Check the results of running the test are as we expect them to be */
            expect(mReq.status).toHaveBeenCalledWith(expectedStatus);
            expect(mReq.json).toHaveBeenCalledWith(expectedReturnValues);


        }); // End of test

        it('should send status 404 and a failure message if the password is missing or incorrect', async () => {

            /* Mock any calls being made */
            jest.spyOn(db, 'query').mockImplementation(() => {
                return {
                    rows: []
                }
            });

            /* Mock the req and res objects */
            const mRes = {
                body: {
                    email: 'user.new@textcompany.org',
                    password: ''
                }
            }
            const mReq = {
                status: jest.fn().mockReturnThis(), json: jest.fn()
            }

            /* Execute the controllers method */
            await controller.registerUser(mRes, mReq);

            /* Set the expected values to be returned */
            const expectedStatus = 404;
            const expectedReturnValues = {
                status: 404,
                state: 'failure',
                message: 'Password is missing or incorrect',
                results: []
            };

            /* Check the results of running the test are as we expect them to be */
            expect(mReq.status).toHaveBeenCalledWith(expectedStatus);
            expect(mReq.json).toHaveBeenCalledWith(expectedReturnValues);


        }); // End of test

        it('should send status 500 and a failure message if there are any other errors', async () => {

            /* Mock any calls being made */
            jest.spyOn(db, 'query').mockImplementation(() => {
                return { rows: [] }
            });

            jest.spyOn(service, 'registerUser').mockImplementation(() => {
                throw new Error('DB connection was reset during query');
            })

            /* Mock the req and res objects */
            const mRes = {
                body: {
                    email: 'user.new@textcompany.org',
                    password: 'l3tm31nPl34s3!!'
                }
            }
            const mReq = {
                status: jest.fn().mockReturnThis(), json: jest.fn()
            }

            /* Execute the controllers method */
            await controller.registerUser(mRes, mReq);

            /* Set the expected values to be returned */
            const expectedStatus = 500;
            const expectedReturnValues = {
                status: 500,
                state: 'failure',
                message: 'There was a problem with the server',
                results: []
            };

            /* Check the results of running the test are as we expect them to be */
            expect(mReq.status).toHaveBeenCalledWith(expectedStatus);
            expect(mReq.json).toHaveBeenCalledWith(expectedReturnValues);


        }); // End of test

    }); // End registerUser test Suite

}); // End Main Test Suite