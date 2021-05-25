import express from 'express';
import imageHandler from '../requestHandler/image';
const imageRouter = express.Router();
const auth = require('../middleware/authentication');
const paginate = require('../middleware/paginate');
import multer from 'multer';
import 'dotenv/config';
const fileUpload = multer();
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

imageRouter
    .post('/images/upload', imageHandler.post);

export default imageRouter;
