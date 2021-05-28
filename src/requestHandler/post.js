import { createPost, listPost, listUserPost, getOne,  updatePost, destroyPost } from '../services/post';
import { getPagination, getPagingData } from '../helpers/pagination';

const postHandler = {
    create: async(req, res) => {
        try {
            const createdPost = await createPost(req.body, req.params.userId);
            if (createdPost.error) {
                return res.json({ status: 500, error: createdPost.error });
            }
            return res.status(201).json({ status: 201, message: 'Post Created Successfully', data: createdPost });
          } catch (error) {
            return res.status(500).json({
              error: 'Internal server error'
            });
        }
    },
    getAll: async(req, res) => {
      try {
          const { page, size } = req.query;
          const { limit, offset } = getPagination(page, size);
          const posts = await listPost(parseInt(limit), parseInt(offset));
          const response = getPagingData(posts, page, limit);
          if (posts.error) {
              return res.json({ status: 500, error: posts.error });
          }
          return res.status(201).json({ status: 200, message: 'Posts Returned Successfully', data: response });
        } catch (error) {
          return res.status(500).json({
            error: 'Internal server error'
          });
      }
    },
    getAllByUser: async(req, res) => {
        try {
            const { page, limit } = req.query;
            const posts = await listUserPost(req.params.userId);
            if (posts.error) {
                return res.json({ status: 500, error: posts.error });
            }
            return res.status(201).json({ status: 200, message: 'Posts Returned Successfully', data: posts });
          } catch (error) {
            return res.status(500).json({
              error: 'Internal server error'
            });
        }
    },
    getOne: async(req, res) => {
        try {
            const post = await getOne(req.params.postId, req.params.userId);
            if (post.error) {
                return res.json({ status: post.status || 500, error: post.error });
            }
            return res.status(201).json({ status: 200, message: 'Post Returned Successfully', data: post });
          } catch (error) {
            return res.status(500).json({
              error: 'Internal server error'
            });
        }
    },
    update: async(req, res) => {
        try {
            const updatedPost = await updatePost(req.body, req.params.postId, req.params.userId);
            if (updatedPost.error) {
              return res.json({ status: updatedPost.status || 500, error: updatedPost.error });
            }
            return res.status(201).json({ status: 200, message: 'Post Updated Successfully', data: updatedPost });
          } catch (error) {
            return res.status(500).json({
              error: 'Internal server error'
            });
        }
    },
    delete: async(req, res) => {
        try {
            const createdPost = await destroyPost(req.params.postId, req.params.userId);
            if (createdPost.error) {
                return res.json({ status: 500, error: createdPost.error });
            }
            return res.status(201).json({ status: 201, message: 'Post Deleted Successfully', data: createdPost });
          } catch (error) {
            return res.status(500).json({
              error: 'Internal server error'
            });
        }
    }
}

export default postHandler;