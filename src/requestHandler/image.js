import { uploadWithCloudinary } from '../helpers/Image'

const imageHandler  = {
    post: async (req, res, next) => {
        try {
            const uploadImage = await uploadWithCloudinary(req.body);
            return res.status(uploadImage.status).json(uploadImage);
          } catch (error) {
            return res.status(500).json({
              error: 'Internal server error'
            });
        }
    }
}

export default imageHandler;
