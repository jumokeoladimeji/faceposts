import express from 'express';

import postHandler from '../requestHandler/post';
import likeHandler from '../requestHandler/like';
import replyHandler from '../requestHandler/reply';
import { verifyToken  } from '../middleware/authentication';
import { paginate  } from '../middleware/authentication';

const postRouter = express.Router();

postRouter
    .post('/user/:userId/posts', verifyToken, postHandler.create)
    .get('/posts', verifyToken, postHandler.getAll)
    .get('/user/:userId/posts', verifyToken, postHandler.getAllByUser)

    .put('/user/:userId/posts/:postId', verifyToken, postHandler.update)
    .get('/user/:userId/posts/:postId', postHandler.getOne)

    .delete('/user/:userId/posts/:postId', verifyToken, postHandler.delete)

    .post('/user/:userId/posts/:postId/likes', verifyToken, likeHandler.likePost)
    .post('/user/:userId/posts/:postId/replies', verifyToken, replyHandler.replyPost);


export default postRouter;
