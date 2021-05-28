const { Post, Like, Reply } = require('../models');
import { uploadWithCloudinary } from '../helpers/image';
  
export const createPost = async (postDetails, userId) => {
    let imageData;
    if (postDetails.image) {
        imageData = await uploadWithCloudinary({file: postDetails.image});
    }
    const postToCreate = {
        image_url: imageData.data || null,
        video_url: postDetails.video_url || null,
        message: postDetails.message,
        friends_tagged: postDetails.friends_tagged || null,
        check_in: postDetails.check_in || null,
        feeling: postDetails.feeling || null,
        userId
    }
    const newPost = await Post.create(postToCreate);
    return newPost.toJSON();
};


/**
 * @description - Fetches all Posts
 * limit - page size
 * * offset - number of rows to be omitted before the beginning of the result set
*/
export const listPost = async (limit, offset) => {
    const posts = await Post.findAndCountAll({
        limit: limit,
        offset: offset,
        include: [{
            model: Like,
            as: 'likes',
        }, {
            model: Reply,
            as: 'replies',
        }]
    });
    return posts;
};


/**
 * @description - Fetches all Posts by single User
*/
export const listUserPost = async (userId) => {
    const posts = await Post.findAll({
        where: { userId },
        include: [{
            model: Like,
            as: 'likes',
        }, {
            model: Reply,
            as: 'replies',
        }]
    });
    return posts;
};

/**
  * @description - Fetches a Post
*/
export const getOne = async (postId, userId) => {
    const post = await Post.findOne({ where: { id: postId, userId }}, 
        {
        include: [{
            model: Like,
            as: 'likes',
        }, {
            model: Reply,
            as: 'replies',
        }],
    });
    if (!post) {
        return {
            error: 'Post not found',
            status: 404
        }
    }
    return post || post.toJSON();
};

/**
* @description - Updates Post details
*/
export const updatePost = async (postDetails, postId, userId) => {
    const post = await Post.findOne({ where: { id: postId, userId }}, 
        {
        include: [{
            model: Like,
            as: 'likes',
        }, {
            model: Reply,
            as: 'replies',
        }],
    })
    if (!post) {
        return { 
            success: false, 
            status: 404, 
            error: 'Post not found'
        };
    }

    post.image_url = postDetails.image_url || post.image_url,
    post.video_url = postDetails.video_url || post.video_url,
    post.message = postDetails.message || post.message,
    post.friends_tagged = postDetails.friends_tagged || post.friends_tagged,
    post.check_in = postDetails.check_in || post.check_in,
    post.feeling = postDetails.feeling|| post.feeling
    await post.save();
    return post;
};

/**
 * @description - Deletes a Post
*/
export const destroyPost = async (postId, userId) => {
    const post = await Post.findOne({ where: { id: postId, userId }},
        {
        include: [{
            model: Like,
            as: 'likes',
        }, {
            model: Reply,
            as: 'replies',
        }],
    });
    if (!post) {
        return {
            error: 'Post not found',
            status: 404
        }
    }
    await Post.destroy({ where: { id: postId, userId }})
    return { 
        success: true, 
        status: 200,
        message: 'Post deleted'
    }
                
}
