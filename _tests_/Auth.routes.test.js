const supertest = require('supertest');
const app = require('../src/server');
const db = require('../src/db/database');

const api = supertest(app);

describe('Authentication', () => {

    describe('Register user', () => {

        beforeEach(() => {
            jest.clearAllMocks();
        })

        it('sends status 201, registers the desired user and returns a message saying registration successful', async () => {

            /* Set the payload to send for the request */
            const payload = {
                email: 'user@testemail.co.uk',
                password: 'L3tsG3t!n'
            }

            /* What are the expected outcomes */
            const expectedStatus = 201;

            const expectedReturnValue = {
                status: 201,
                state: 'ok',
                message: 'Registration successful',
                results: [
                    { id: 1, email: 'user@testemail.co.uk'}
                ]
            }

            /* Mock out the backend functionality like the DB call */
            jest.spyOn(db, 'query').mockImplementation(() => {
                return {
                    rows: [
                        {id: 1, email: 'user@testemail.co.uk'}
                    ]
                }
            });

            /* Execute the test */
            const res = await api.post('/register').send(payload);

            /* Check the values are as we expect */
            expect(res.statusCode).toBe(expectedStatus);
            expect(res.headers['content-type']).toMatch(/json/);
            expect(res.body).toEqual(expectedReturnValue);

        }); // End of test

        it('sends status 400 if the email address is not sent or invalid', async () => {

            /* Set the payload to send for the request */
            const payload = {
                email: '',
                password: 'L3tsG3t!n'
            }

            /* What are the expected outcomes */
            const expectedStatus = 404;

            const expectedReturnValue = {
                status: 404,
                state: 'failure',
                message: 'Email address is missing or incorrect',
                results: []
            }

            /* Mock out the backend functionality like the DB call */
            jest.spyOn(db, 'query').mockImplementation(() => {
                return {
                    rows: []
                }
            });

            /* Execute the test */
            const res = await api.post('/register').send(payload);

            /* Check the values are as we expect */
            expect(res.statusCode).toBe(expectedStatus);
            expect(res.headers['content-type']).toMatch(/json/);
            expect(res.body).toEqual(expectedReturnValue);

        }); // End of test

        it('sends status 400 if the password is not sent or invalid', async () => {

            /* Set the payload to send for the request */
            const payload = {
                email: 'nouser@testemail',
                password: ''
            }

            /* What are the expected outcomes */
            const expectedStatus = 404;

            const expectedReturnValue = {
                status: 404,
                state: 'failure',
                message: 'Password is missing or incorrect',
                results: []
            }

            /* Mock out the backend functionality like the DB call */
            jest.spyOn(db, 'query').mockImplementation(() => {
                return {
                    rows: []
                }
            });

            /* Execute the test */
            const res = await api.post('/register').send(payload);

            /* Check the values are as we expect */
            expect(res.statusCode).toBe(expectedStatus);
            expect(res.headers['content-type']).toMatch(/json/);
            expect(res.body).toEqual(expectedReturnValue);

        }); // End of test

        it('sends status 500 for any other error', async () => {

            /* Set the payload to send for the request */
            const payload = {
                email: 'nouser@testemail',
                password: 'L3tsG3t!n'
            }

            /* What are the expected outcomes */
            const expectedStatus = 500;

            const expectedReturnValue = {
                status: 500,
                state: 'failure',
                message: 'There was a problem with the server',
                results: []
            }

            /* Mock out the backend functionality like the DB call */
            jest.spyOn(db, 'query').mockImplementation(() => {
                return {
                    rows: []
                }
            });

            /* Execute the test */
            const res = await api.post('/register').send(payload);

            /* Check the values are as we expect */
            expect(res.statusCode).toBe(expectedStatus);
            expect(res.headers['content-type']).toMatch(/json/);
            expect(res.body).toEqual(expectedReturnValue);

        }); // End of test

    })

}) // End of Authentication test suite