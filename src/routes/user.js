import express from 'express';

import userHandler from '../requestHandler/user';
const userRouter = express.Router();

userRouter
    .post('/signup', userHandler.signup)
    .get('/verify/:token', userHandler.verify)
    .post('/signin', userHandler.signin)
    .get('/:userId([0-9]+)', userHandler.get)
    .post('/forgotpassword', userHandler.forgotPassword)
    .get('/resetPassword/:token', userHandler.validateResetToken)
    .post('/changePassword/:token', userHandler.changePassword)

export default userRouter;
