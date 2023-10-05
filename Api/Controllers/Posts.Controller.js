const express = require('express');
const mssql = require('mssql');
const { sqlConfig } = require('../Config/config');

// Create a new post
const createPost = async (req, res) => {
  try {
    // console.log(req.body);
    const { userId, content, postImage } = req.body;
    // console.log(error.message);

    if (!userId || !content) {
      return res.status(400).json({ error: 'Please provide post caption' });
    }
    const pool = await mssql.connect(sqlConfig);

    // Insert the new post into the database
    const result = await pool.request()
      .input('user_id', mssql.VarChar, userId)
      .input('content', mssql.Text, content)
      .input('post_image_url', mssql.VarChar, postImage || null) //
      .execute('CreateNewPostPROC');

    // Check if the post was successfully created
    if (result.rowsAffected[0] == 1) {
      return res.status(200).json({ message: 'Post created successfully' });
    } else {
      return res.status(400).json({ error: 'Failed to create the post' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Fetch posts by a specific user
const getPostsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const pool = await mssql.connect(sqlConfig);
    // Fetch posts by user ID from the database
    const result = await pool.request()
      .input('user_id', mssql.VarChar, userId)
      .execute('getUserPostsPROC');
  
    // Return the fetched posts
    return res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'User not Found' });
  }
};
const getPostByPostId = async (req, res) => {
  try {
    const postId = req.params.postId;

    const pool = await mssql.connect(sqlConfig);
    // Fetch posts by user ID from the database
    const result = await pool.request()
      .input('post_id', mssql.VarChar, postId)
      .execute('getPostByPostIdPROC');
  
    // Return the fetched posts
    return res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'User not Found' });
  }
}

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const result = await pool.request().execute('GetAllPostsProc');

    return res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Edit a post
const editPost = async (req, res) => {
    try {
      const { userId, content, postImage } = req.body;
      const { postId } = req.params;
      // console.log(req.params);
     
      // console.log(postId, userId, content, postImage);
      const pool = await mssql.connect(sqlConfig);

      if (!userId || !content || !postId) {
        return res.status(400).json({ error: 'User ID, post ID, and content are required' });
      }
  
      // Update the post in the database
      const result = await pool.request()
        .input('user_id', mssql.VarChar, userId)
        .input('post_id', mssql.Int, postId)
        .input('content', mssql.Text, content)
        .input('post_image_url', mssql.VarChar, postImage || null) // Optional post image
        .execute('editPostPROC');
  
      // Check if the post was successfully updated
      if (result.rowsAffected[0] === 1) {
        return res.status(200).json({ message: 'Post updated successfully' });
      } else if (result.rowsAffected[0] === 0) {
        return res.status(400).json({ error: 'Failed to update the post' });
      }
    } catch (error) {
      // console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  

// Delete a post
const deletePost = async (req, res) => {
  try {
    const { userId, postId } = req.params;
    
    if (!userId || !postId) {
      return res.status(400).json({ error: 'User ID and post ID are required' });
    }

    const pool = await mssql.connect(sqlConfig);

    // Check if the user exists in the usersTable
    // const userCheckResult = await pool.request()
    //   .input('user_id', mssql.VarChar, userId)
    //   .query('SELECT 1 FROM usersTable WHERE id = @user_id');

    // if (userCheckResult.recordset.length === 0) {
    //   return res.status(404).json({ error: 'User not found' });
    // }

    // Check if the post belongs to the user
    // const postCheckResult = await pool.request()
    //   .input('user_id', mssql.VarChar, userId)
    //   .input('post_id', mssql.Int, postId)
    //   .query('SELECT 1 FROM postsTable WHERE post_id = @post_id AND user_id = @user_id');

    // if (postCheckResult.recordset.length === 0) {
    //   return res.status(403).json({ error: 'Access denied: Post does not belong to this user or does not exist' });
    // }

    // Delete the post from the database
    const result = await pool.request()
      .input('user_id', mssql.VarChar, userId)
      .input('post_id', mssql.Int, postId)
      .execute('deletePostPROC');

    // Check if the post was successfully deleted
    if (result.rowsAffected[0] == 1) {
      return res.status(200).json({ message: 'Post deleted successfully' });
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ error: 'Internal Server error' });
  }
};


module.exports = {
    createPost,
    getPostsByUser,
    getPostByPostId,
    getAllPosts,
    editPost,
    deletePost
}
