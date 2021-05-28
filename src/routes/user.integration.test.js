import supertest from 'supertest';
import server from '../server';

jest.mock('../services/user');
jest.mock('../middleware/authentication');

const { getUser } = require('../services/user');
const { validPassword } = require('..//middleware/authentication');

afterAll(async () => {
    server.close();
});
  
const request = supertest(server);

describe('POST /api/v1/user/signup', () => {
    test('should return error if there are no parameters passed', async () => {
        await expect(
            request.post('/api/v1/user/signup').send({}).set('Accept', 'application/json'),
        ).resolves.toHaveProperty('status', 422);
    })
    test('should return error if email is invalid', async () => {
        await expect(
            request.post('/api/v1/user/signup').send({ email: 1232 }).set('Accept', 'application/json'),
        ).resolves.toHaveProperty('status', 422);
    })
    test('should return error if password is invalid', async () => {
        await expect(
            request.post('/api/v1/user/signup').send({ email: 'test@gmail.com', password: 123 }).set('Accept', 'application/json'),
        ).resolves.toHaveProperty('status', 422);
    })
});


describe('POST /api/v1/user/signin', () => {
    test('should return error if there are no parameters passed', async () => {
        await expect(
            request.post('/api/v1/user/signin').send({}).set('Accept', 'application/json'),
        ).resolves.toHaveProperty('status', 422);
    })
    test('should return error if email is invalid', async () => {
        await expect(
            request.post('/api/v1/user/signin').send({ email: 1232 }).set('Accept', 'application/json'),
        ).resolves.toHaveProperty('status', 422);
    })
    test('should return error if password is invalid', async () => {
        await expect(
            request.post('/api/v1/user/signin').send({ email: 'test@gmail.com', password: 123 }).set('Accept', 'application/json'),
        ).resolves.toHaveProperty('status', 422);
    })

    test('should return error if user exists and account is not verified', async () => {
        getUser.mockImplementationOnce(() =>
            Promise.resolve({
                isVerified: false
            })
        );
        await expect(
            request.post('/api/v1/user/signin').send({ email: 'test@gmail.com', password: '1232369HYI@!' }).set('Accept', 'application/json'),
        ).resolves.toHaveProperty('status', 403);
    })

    test('should successfully signin user', async () => {
        getUser.mockImplementationOnce(() =>
            Promise.resolve({
                isVerified: true,
                email: 'test@gmail.com',
                password: '*@&@*'
            })
        );
        validPassword.mockImplementationOnce(() => Promise.resolve(true));
    
        await expect(
            request.post('/api/v1/user/signin').send({ email: 'test@gmail.com', password: '1232369HYI@!' }).set('Accept', 'application/json'),
        ).resolves.toHaveProperty('status', 200);
    })
});