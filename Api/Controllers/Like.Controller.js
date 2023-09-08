const express = require('express');
const mssql = require('mssql');
const { sqlConfig } = require('../Config/config');

// Like a post
const likePost = async (req, res) => {
  try {
    const { userId, postId} = req.body;
    // console.log(error.message);

    if (!userId || !postId) {
      return res.status(400).json({ error: 'User ID and post ID are required' });
    }

    const pool = await mssql.connect(sqlConfig);

    // Insert the new post into the database
    const result = await pool.request()
    .input('user_id', mssql.VarChar, userId)
    .input('post_id', mssql.Int, postId)
      .execute('likePostPROC');

    // Check if the post was successfully created
    if (result.rowsAffected[0] === 1) {
      return res.status(201).json({ message: 'Post liked successfully' });
    } else {
      return res.status(500).json({ error: 'User had already liked this post' });
    }
  } catch (error) {
    // console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
// Get likes by post ID
const getLikesByPost = async (req, res) => {
  const postId = req.params.postId;

  try {
    const pool = await mssql.connect(sqlConfig);
    const result = await pool
      .request()
      .input('post_id', mssql.Int, postId)
      .execute('GetLikesByPostProc');

    return res.status(200).json(result.recordset);
  } catch (error) {
    // console.error(error);
    return res.status(500).json({ error: 'Internal Server error' });
  }
};

// Unlike a post
const unlikePost = async (req, res) => {
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
      .execute('unlikePostPROC');

    // Check if the post was successfully deleted
    if (result.rowsAffected[0] === 1) {
      return res.status(200).json({ message: 'Post unliked successfully' });
    } else {
      return res.status(500).json({ error: 'User has not liked the post.' });
    }
  } catch (error) {
    // console.error(error);
    return res.status(500).json({ error: 'Internal Server error' });
  }
};

module.exports = {
  likePost,
  getLikesByPost,
  unlikePost
};




