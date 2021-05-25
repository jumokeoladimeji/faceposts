import { addPostReply } from '../services/reply';

const replyHandler = {
    replyPost: async (req, res) => {
        try {
            const { postId, userId } = req.params;
            const repliedPost = await addPostReply(req.body, postId, userId);
            if (repliedPost.error) {
                return res.json({ status: 500, error: repliedPost.error });
            }
            return res.status(201).json({ status: 201, message: 'Post Replied Successfully', data: repliedPost });
          } catch (error) {
            return res.status(500).json({
                error: 'Internal server error'
            });
        }
    }
}

export default replyHandler;