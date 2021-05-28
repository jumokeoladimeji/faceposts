import * as userService from '../services/user';
import { createUser, signinUser } from './user';

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
      const userServiceGetUserSpy = jest.spyOn(userService, 'getUser').mockImplementationOnce(() =>
        Promise.resolve(mockedUser)
      );

      const result =  await createUser(user, host);
      expect(userServiceGetUserSpy).toHaveBeenCalledWith({"email": "test@mail.com"});
      expect({ 
        success: false,
        status: 422,
        error: 'User with email address alreading exists.'
      }).toEqual(result);
    });
  });

  describe('signinUser', () => {
    test('should return error if params are invalid', async () => {
      await expect(signinUser({ password: 'test', email: 'test22' })).resolves.toHaveProperty('status', 422);
    });

    test('should return error if user exists and account is not verified', async () => {
      mockedUser.isVerified = false;
      const userServiceGetUserSpy = jest.spyOn(userService, 'getUser').mockImplementationOnce(() =>
        Promise.resolve(mockedUser)
      );

      const result =  await signinUser(user);
      expect(userServiceGetUserSpy).toHaveBeenCalledWith({"email": "test@mail.com"});
      expect({ 
        success: false,
        status: 403,
        error: 'Please verify your account.'
      }).toEqual(result);
    });

    test('should return error if user exists and password does not match saved password', async () => {
      mockedUser.isVerified = true;
      const userServiceGetUserSpy = jest.spyOn(userService, 'getUser').mockImplementationOnce(() =>
        Promise.resolve(mockedUser)
      );

      const result =  await signinUser(user);
      expect(userServiceGetUserSpy).toHaveBeenCalledWith({"email": "test@mail.com"});
      expect({ 
        success: false,
        status: 401,
        error: 'Invalid password.'
      }).toEqual(result);
    });
  });
});
