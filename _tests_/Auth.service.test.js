const db = require('../src/db/database');
const service = require('../src/services/Auth.service');

describe('Auth Services', () => {

    describe('registerUser', () => {

        afterEach(() => {
            jest.clearAllMocks();
        })

        it('should register the user and return id and email', async () => {

            /* Mock any processes or methods we need to */
            jest.spyOn(db, 'query').mockImplementation(() => {
                return {
                    rows: [
                        { id: 1, email: 'newuser2@testcompany.com'}
                    ]
                }
            });

            /* Create the values to pass to the method being tested */
            const email = 'newuser2@testcompany.com';
            const password = 'L3tM3iNt0D4Y!';

            /* Set the expected outcomes */
            const expectedResult = {
                message: 'Registration successful',
                results: [
                    { id: 1, email: 'newuser2@testcompany.com'}
                ]
            }

            /* Execute the test */
            const res = await service.registerUser(email, password);

            expect(res).toEqual(expectedResult);

        }); // End of test

        it('should return an error if the email is missing or incorrect', async () => {

            /* Mock any processes or methods we need to */
            jest.spyOn(db, 'query').mockImplementation(() => {
                return {
                    rows: [
                        { id: 1, email: 'newuser2@testcompany.com'}
                    ]
                }
            });

            /* Create the values to pass to the method being tested */
            const email = '';
            const password = 'L3tM3iNt0D4Y!';

            /* Set the expected outcomes */
            const expectedResult = {
                message: 'Email address is missing or incorrect',
                results: []
            }

            /* Execute the test */
            const res = await service.registerUser(email, password);

            expect(res).toEqual(expectedResult);

        }); // End of test

        it('should return an error if the password is missing or incorrect', async () => {

            /* Mock any processes or methods we need to */
            jest.spyOn(db, 'query').mockImplementation(() => {
                return {
                    rows: [
                        { id: 1, email: 'newuser2@testcompany.com'}
                    ]
                }
            });

            /* Create the values to pass to the method being tested */
            const email = 'newuser2@testcompany.com';
            const password = '';

            /* Set the expected outcomes */
            const expectedResult = {
                message: 'Password is missing or incorrect',
                results: []
            }

            /* Execute the test */
            const res = await service.registerUser(email, password);

            expect(res).toEqual(expectedResult);

        }); // End of test

        it('should return an error if there was any other issue', async () => {

            /* Mock any processes or methods we need to */
            jest.spyOn(db, 'query').mockImplementation(() => {
                throw new Error('DB Connection issue');
            });

            /* Create the values to pass to the method being tested */
            const email = 'newuser2@testcompany.com';
            const password = 'L3tM3iNt0D4Y';

            /* Set the expected outcomes */
            const expectedResult = {
                message: 'There was a problem with the server',
                results: []
            }

            /* Execute the test */
            const res = await service.registerUser(email, password);

            expect(res).toEqual(expectedResult);

        }); // End of test

    }); // End of registerUser Test Suite

}); // End of Auth Service Test Suite