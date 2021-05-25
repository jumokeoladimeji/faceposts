import * as joi from 'joi';

import { hashPassword, generateToken, validPassword  } from '../middleware/authentication';
import { userServiceCreate, getUser, saveUser } from '../services/user';
import { verifyEmailToken, saveToken, updateToken } from '../services/token';
import { sendEmail } from '../helpers/email';
import { validate } from '../helpers/validator';

export const createUser = async (userDetails, host) => {
  // validate obj with joi
  const createUserSchema = joi.object({
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: joi.string().min(7).required(),
    username: joi.string(),
    email: joi.string(),
    phoneNumber: joi.number(),
    image: joi.string()
  });

  const validationResponse = validate(createUserSchema, userDetails);

  if (validationResponse.error) {
    return {
      success: false,
      status: 422,
      error: validationResponse.error,
    };
  }

  const existingUser = await getUser({ email: userDetails.email});
  if (existingUser) {
    return {
      success: false,
      status: 422,
      error: 'User with email address alreading exists.',
    }
  }
  
  const userObj = {
    name: userDetails.name || null,
    username: userDetails.username || null,
    email: userDetails.email,
    phoneNumber: userDetails.phoneNumber || null,
    image: userDetails.image || null,
    password: userDetails.password
  };

  const createdUser = await userServiceCreate(userObj);

  const token = generateToken(createdUser);
  await saveToken({ token, email: createdUser.email });

  // send email
  const url = `http://${host}/api/v1/user/verify/${token}`;
  const emailObj = {
    message: `Hi ${createdUser.username ? createdUser.username: 'user'}, <br><br>Please visit this url to verify your email: <br><a href=${url}>${url}</a><br><br> Regards, <br><i>FacePosts.</i>`,
    subject: 'Please Confirm Your Account',
    email: createdUser.email
  };
  await sendEmail(emailObj);
  return {
    success: true,
    data: createdUser,
    status: 201,
    message: `An email has been sent to ${createdUser.email} with further instructions.`,
  };
}

// verify token and sign in user
export const verifyTokenAndCompleteSignup = async (token) => {
  // check if user with token and email exists
  const existingUserWithToken = await verifyEmailToken({ token });
  if (!existingUserWithToken) {
    return {
      success: false,
      status: 403,
      error: 'Invalid Token',
    };
  }
  const existingUser = await getUser({ email: existingUserWithToken.email});
  if(!existingUser) {
    return {
      success: false,
      status: 403,
      error: 'User with email address does not exist.',
    };
  }
  if(existingUser) {
    const signinToken = generateToken(existingUser, '1 day');
    existingUser.isVerified = true;
    await saveUser(existingUser, { email: existingUser.email});

    return {
      success: true,
      data: existingUser,
      token: signinToken,
      status: 200,
    };
  }
}

export const signinUser = async (userDetails) => {
    // validate obj with joi
    const signinSchema = joi.object({
      email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: joi.string().min(7).required()
    });

    const validationResponse = validate(signinSchema, userDetails);

    if (validationResponse.error) {
      return {
        success: false,
        status: 422,
        error: validationResponse.error,
      };
    }
    const user = await getUser({ email: userDetails.email});
    if (!user) {
      return {
        success: false,
        status: 401, 
        error: 'User with email does not exist.' 
      };
    }
    if (!user.isVerified) {
      return {
        success: false,
        status: 403, 
        error: 'Please verify your account.' 
      };
    }
    const passwordMatch = await validPassword(userDetails.password, user.password);
    if (!passwordMatch) {
      return { 
        success: false,
        status: 401,
        error: 'Invalid password.' 
      };
    }

    const signinToken = generateToken(user, '1 day');
    return {
      success: true,
      data: user,
      token: signinToken,
      status: 200
    };
}

export const getUserDetails = async (userId) => {
  const user = await getUser({ id: userId });
    if (!user) {
      return {
        success: false,
        status: 401, 
        error: 'User does not exist.' 
      };
    }
    return {
      success: true,
      data: user,
      status: 200
    };
}

export const updateUser = async  (userId, userDetails) => {
    // validate obj with joi
  const user = await getUser({ id: userId });
  if(!user) {
    return {
      success: false,
      status: 403,
      error: 'User with email address does not exist',
    };
  }
  const hashedPasswordToSave = userDetails.password ? hashPassword(userDetails.password) : user.Password
  user
    .update({
      name: userDetails.name || user.name,
      username: userDetails.username || user.username,
      email: userDetails.email || user.email,
      phoneNumber: userDetails.phoneNumber || user.phoneNumber,
      image: userDetails.image || user.image,
      password: hashedPasswordToSave,
    })
    .then((updatedUser) => {
      return {
        success: true,
        status: 200, 
        data: updatedUser
      };
    })
    .catch((error) => {
      return {
        success: false,
        status: 500, 
        error
      }
    });
}

export const initiatePasswordReset =  async (userObj, host) => {
  const passwordResetSchema = joi.object({
    email: joi.string().email().required()
  });
  const validationResponse = validate(passwordResetSchema, userObj);
  if (validationResponse.error) {
    return {
      success: false,
      status: 400,
      error: validationResponse.error,
    };
  }

  const user = await getUser({ email: userObj.email });
  if (!user) {
    return {
      success: false,
      status: 400,
      error: 'User with email address does not exist',
    };
  }
  const token = generateToken(user, '1 day');

  await updateToken({ token, expiresAt: Date.now() + 3600000 }, { email: user.email });

  // send email
  const url = `http://${host}/api/v1/user/resetPassword/${token}`;
  
  const emailObj = {
    message: `<div style='text-align:justify'>Hi ${user.username ? user.username: 'user'}, <br><br>Please visit this url to reset your password: <br><a href=${url}>${url}</a><br><br> Regards, <br><i>FacePosts.</i></div>`,
    subject: 'Password Reset',
    email: user.email
  };
  await sendEmail(emailObj);
  return {
    success: true,
    status: 200,
    message: `An email has been sent to ${user.email} with further instructions.`,
  };      
};

export const validatePasswordResetToken =  async (token, host) => {
  const existingUserWithToken = await verifyEmailToken({ token });
  const expiryDate = new Date(existingUserWithToken.expiresAt).getTime()/1000;

  if (!existingUserWithToken || expiryDate < new Date().getTime()/1000) {
    return {
      success: false,
      status: 403,
      error: `Invalid Password reset Token. Reset your password here http://${host}/api/v1/user/forgotpassword`,
    };
  }
  existingUserWithToken.expiresAt = new Date.now();
  await updateToken(existingUserWithToken, { email: existingUserWithToken.email});
  return {
    success: true,
    status: 200,
    message: `Change Your Password here http://${host}/api/v1/user/changePassword/${token}`
  };
}

export const updatePassword =  async (userObj, token) => {
  const passwordResetSchema = joi.object({
    password: joi.string().required(),
    confirmPassword: joi.string().required()
  }).with('password', 'confirmPassword');

  const validationResponse = validate(passwordResetSchema, userObj);
  if (validationResponse.error) {
    return {
      success: false,
      status: 400,
      error: validationResponse.error,
    };
  }

  if (userObj.password !== userObj.confirmPassword) {
    return {
      success: false,
      status: 400,
      error: 'Password does not match',
    };
  }
  const existingUserWithToken = await verifyEmailToken({ token });
  const user = await getUser({ email: existingUserWithToken.email });

  if (user) {
    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;
    const signinToken = generateToken(user, '1 day');
    const updateNewToken =  updateToken({ token: signinToken, expiresAt: Date.now() + 3600000 }, { email: user.email });
    const newUser = saveUser(user, { email: user.email});

    await Promise.all([updateNewToken, newUser]);
  
    return {
      success: true,
      data: user,
      token: signinToken,
      status: 200
    };
  }
};
