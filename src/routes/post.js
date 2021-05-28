import express from 'express';

import postHandler from '../requestHandler/post';
import likeHandler from '../requestHandler/like';
import replyHandler from '../requestHandler/reply';
import { verifyToken  } from '../middleware/authentication';
import { paginate  } from '../middleware/authentication';

const postRouter = express.Router();

postRouter
    // .post('/', verifyToken, postHandler.create)
    .post('/user/:userId/posts', postHandler.create)
    // .get('/', verifyToken, paginate(), postHandler.getAll)
    .get('/posts', postHandler.getAll)
    .get('/user/:userId/posts', postHandler.getAllByUser)

    // .put('/:postId', verifyToken, postHandler.update)
    .put('/user/:userId/posts/:postId', postHandler.update)

    // .get('/:postId', verifyToken, postHandler.get)
    .get('/user/:userId/posts/:postId', postHandler.getOne)

    .delete('/user/:userId/posts/:postId', postHandler.delete)
        // .post('/:postId/likes', verifyToken, postHandler.get)

    .post('/user/:userId/posts/:postId/likes', likeHandler.likePost)
    .post('/user/:userId/posts/:postId/replies', replyHandler.replyPost);
    // .delete('/:postId', verifyToken, postHandler.delete);

export default postRouter;
