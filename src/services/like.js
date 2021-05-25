const { Post, Like } = require('../models');

export const likeUserPost =  async (likeObj, postId, userId) => {
    const like = await Like.findOne({ 
        attributes: ['id', 'content', 'createdAt', 'updatedAt', 'postId', 'userId'],
        where: { postId, userId } });
    if (!like) {
        const newLIke = await Like.create({
            userId,
            postId,
            content: likeObj.content,
        })
        return newLIke.toJSON();
    } else {
        like.content = likeObj.content;
        await like.save();
        return like;
    }
};
