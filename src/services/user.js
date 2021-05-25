const { User } = require('../models');
const auth = require('../middleware/authentication');
import { hashPassword  } from '../middleware/authentication';

export const userServiceCreate = async (userDetails) => {
  const hashedPassword = await hashPassword(userDetails.password);
  userDetails.password = hashedPassword;

  const newUser = await User.create(userDetails);
  return newUser.toJSON();
}

export const updateUser = async (userId, userDetails) => {
  const user = await User.findOne({ where: { id: userId} })
  if (!user) {
    return res.json({
      message: 'User does not exist',
    });
  }
  let hashedPassword;
  if (userDetails.password) {
    hashedPassword = await hashPassword(userDetails.password);
  }

  const hashedPasswordToSave = userDetails.password ? hashedPassword : user.Password
  user.name = userDetails.name || user.name;
  user.username = userDetails.username || user.username;
  user.email = userDetails.email || user.email;
  user.phoneNumber = userDetails.phoneNumber || user.phoneNumber;
  user.image = userDetails.image || user.image;
  user. password = hashedPasswordToSave;

  await user.save();
  return user;
};

export const getUser = async (condition) => {
  const user = await User.findOne({ where: condition })
  return user ? user.toJSON(): user;
};


export const saveUser = (user, condition) => {
  return User.update(user, {
    where: condition
  });
}
