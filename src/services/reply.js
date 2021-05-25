
const { Post, Reply } = require('../models');

export const addPostReply = async (replyObj, postId, userId) => {
    const newReply = await Reply.create({
        userId,
        postId,
        content: replyObj.content
    });
    return newReply.toJSON();
};
