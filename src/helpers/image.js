import multer from 'multer';
import 'dotenv/config';
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


export const uploadWithCloudinary = async(body) => {
    const fileUploaded = await cloudinary.uploader.upload(body.file);
    return {
        success: true,
        data: fileUploaded.secure_url,
        status: 200
    }
}