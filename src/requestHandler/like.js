import { likeUserPost } from '../services/like';

const likeHandler = {
    likePost: async (req, res) => {
        try {
            const { postId, userId } = req.params;
            const likedPost = await likeUserPost(req.body, postId, userId);
            if (likedPost.error) {
                return res.json({ status: 500, error: likedPost.error });
            }
            return res.status(201).json({ status: 201, message: 'Post Replied Successfully', data: likedPost });
          } catch (error) {
            return res.status(500).json({
                error: 'Internal server error'
            });
        }
    }
}

export default likeHandler;