import { mocked } from 'ts-jest/utils';
import { createUser } from './user';
import { userServiceCreate, updateUser, getUser } from '../servces/user';
import { verifyEmailToken } from '../services/token';

jest.mock('../services/user');
const mockedUserServiceCreate = mocked(userServiceCreate, true);
const mockedUpdateUser = mocked(updateUser, true);
const mockedGetUser = mocked(getUser, true);
const mockedVerifyEmailToken = mocked(verifyEmailToken, true);


const mockedUser = {
  id: '1232',
  email: 'test@mail.com',
  password: '123456',
  username: 'tester'
};

const user = {
  email: 'test@mail.com',
  password: '1239g5qwas@#45'
}

const host = 'localhost:200';

describe('user controller', () => {
  describe('createUser', () => {
    test('should return error if email is invalid', async () => {
      await expect(createUser({ email: 'test' }, host)).resolves.toHaveProperty('status', 422);
    });

    test('should return error if password is invalid', async () => {
      await expect(createUser({ password: 'test' }, host)).resolves.toHaveProperty('status', 422);
    });

    test('should return error if user already exists', async () => {
      mockedGetUser.mockImplementationOnce(() =>
        Promise.resolve(mockedUser)
      );
      await expect(createUser(user, host)).resolves.toHaveProperty('error', 'User with email address alreading exists.');
    });

    test('should return user if user creation is successful', async () => {
      mockedCreateUser.mockImplementationOnce(() =>
        Promise.resolve(mockedUser)
      );
      await expect(createUser(user, host)).resolves.toHaveProperty('status', 201);
    });
  });

  describe('signinUser', () => {
    test('should return error if params are invalid', async () => {
      await expect(signinUser({ password: 'test', email: 'test22' })).resolves.toHaveProperty('status', 422);
    });

    test('should return error if user exists', async () => {
      mockedGetUser.mockImplementationOnce(() =>
        Promise.resolve(mockedUser)
      );
      await expect(signinUser(user)).resolves.toHaveProperty('error', 'User with email does not exist.');
    });
  
    test('should return error if password does not match', async () => {
      mockedFindUser.mockImplementationOnce(() =>
        Promise.resolve(mockedUser)
      );
      await expect(signinUser(user)).resolves.toHaveProperty('error', 'Invalid password.');
    });
  
    test('should login user if successful', async () => {
      mockedFindUser.mockImplementationOnce(() =>
        Promise.resolve(mockedUser)
      );
      await expect(signinUser(user)).resolves.toHaveProperty('status', 200);
    });
  });

  describe('verifyTokenAndCompleteSignup', () => {
    test('should return error if token is invalid', async () => {
      mockedVerifyEmailToken.mockImplementationOnce(() =>
      Promise.resolve(false)
    );
      await expect(verifyTokenAndCompleteSignup({ password: 'test', email: 'test22' })).resolves.toHaveProperty('status', 422);
    });

    test('should return error if user does not exists', async () => {
      mockedGetUser.mockImplementationOnce(() =>
        Promise.resolve(mockedUser)
      );
      await expect(verifyTokenAndCompleteSignup('w823772%^7')).resolves.toHaveProperty('error', 'User with email does not exist.');
    });
  });
});
