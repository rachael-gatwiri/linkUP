const express = require('express');
const mssql = require('mssql');
const { sqlConfig } = require('../Config/config');

// Create a new post
const createPost = async (req, res) => {
  try {
    const { userId, content, postImage } = req.body;
    // console.log(error.message);

    if (!userId || !content) {
      return res.status(400).json({ error: 'User ID and post content are required' });
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
      return res.status(201).json({ message: 'Post created successfully' });
    } else {
      return res.status(500).json({ error: 'Failed to create the post' });
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
      const postId = req.params.postId;
  
      if (!userId || !content || !postId) {
        return res.status(400).json({ error: 'User ID, post ID, and content are required' });
      }
  
      const pool = await mssql.connect(sqlConfig);
  
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
      } else {
        return res.status(500).json({ error: 'Failed to update the post' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  

// Delete a post
const deletePost = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    // const postId = req.params.postId;

    if (!userId || !postId) {
      return res.status(400).json({ error: 'User ID and post ID are required' });
    }

    const pool = await mssql.connect(sqlConfig);

    // Delete the post from the database
    const result = await pool.request()
      .input('user_id', mssql.VarChar, userId)
      .input('post_id', mssql.Int, postId)
      .execute('deletePostPROC');

    // Check if the post was successfully deleted
    if (result.rowsAffected[0] === 1) {
      return res.status(200).json({ message: 'Post deleted successfully' });
    } else {
      return res.status(500).json({ error: 'Failed to delete the post' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Post not found' });
  }
};

module.exports = {
    createPost,
    getPostsByUser,
    getAllPosts,
    editPost,
    deletePost
}
