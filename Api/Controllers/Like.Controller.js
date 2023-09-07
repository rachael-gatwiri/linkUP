const express = require('express');
const mssql = require('mssql');
const { sqlConfig } = require('../Config/config');

// Get all likes
const getAllLikes = async (req, res) => {
    try {
        const pool = await mssql.connect(sqlConfig);
        const result = await pool.request()
            .execute('GetAllLikesPROC');

        return res.status(200).json(result.recordset);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// Like a post
const likePost = async (req, res) => {
  const { userId } = req.body;
  const postId = req.params.postId;

  if (!userId || !postId) {
    return res.status(400).json({ error: 'User ID and post ID are required' });
  }

  try {
    const pool = await mssql.connect(sqlConfig);

    // Check if the user has already liked the post
    const checkLikeResult = await pool.request()
      .input('userId', mssql.VarChar, userId)
      .input('postId', mssql.Int, postId)
      .execute('checkLikeProc');

    if (checkLikeResult.recordset.length > 0) {
      return res.status(400).json({ error: 'User has already liked this post' });
    }

    // Insert a like into the database
    const insertLikeResult = await pool.request()
      .input('userId', mssql.VarChar, userId)
      .input('postId', mssql.Int, postId)
      .execute('likePostProc');

    // Check if the like was successfully added
    if (insertLikeResult.rowsAffected[0] === 1) {
      return res.status(200).json({ message: 'Post liked successfully' });
    } else {
      return res.status(500).json({ error: 'Failed to like the post' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Unlike a post
const unlikePost = async (req, res) => {
  const { userId } = req.body;
  const postId = req.params.postId;

  if (!userId || !postId) {
    return res.status(400).json({ error: 'User ID and post ID are required' });
  }

  try {
    const pool = await mssql.connect(sqlConfig);

    // Check if the user has already liked the post
    const checkLikeResult = await pool.request()
      .input('userId', mssql.VarChar, userId)
      .input('postId', mssql.Int, postId)
      .execute('checkLikeProc');

    if (checkLikeResult.recordset.length === 0) {
      return res.status(400).json({ error: 'User has not liked this post' });
    }

    // Delete the like from the database
    const deleteLikeResult = await pool.request()
      .input('userId', mssql.VarChar, userId)
      .input('postId', mssql.Int, postId)
      .execute('unlikePostProc');

    // Check if the like was successfully deleted
    if (deleteLikeResult.rowsAffected[0] === 1) {
      return res.status(200).json({ message: 'Post unliked successfully' });
    } else {
      return res.status(500).json({ error: 'Failed to unlike the post' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllLikes,
  likePost,
  unlikePost
};
