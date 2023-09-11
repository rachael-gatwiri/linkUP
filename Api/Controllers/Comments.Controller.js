const express = require('express');
const mssql = require('mssql');
const { sqlConfig } = require('../Config/config');

// Add a Comment
const addComment = async (req, res) => {
  try {
    const { user_id, post_id, parent_comment_id, comment_text } = req.body;

    const pool = await mssql.connect(sqlConfig);

    // Call the stored procedure to add a comment
    await pool.request()
      .input('user_id', mssql.VarChar, user_id)
      .input('post_id', mssql.Int, post_id)
      .input('parent_comment_id', mssql.Int, parent_comment_id || null)
      .input('comment_text', mssql.Text, comment_text)
      .execute('AddCommentOrReplyProc');
    return res.status(201).json({ message: 'Comment added successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
  
// Get Comments by Post
const getCommentsByPost = async (req, res) => {
  try {
    const { post_id } = req.params;

    const pool = await mssql.connect(sqlConfig);

    // Call the stored procedure to get comments by post
    const result = await pool.request()
      .input('post_id', mssql.Int, post_id)
      .execute('GetCommentsByPostProc');

    return res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get Comments by Comment (Replies)
const getCommentsByComment = async (req, res) => {
  try {
    const { comment_id } = req.params;

    const pool = await mssql.connect(sqlConfig);

    // Call the stored procedure to get comments by comment
    const result = await pool.request()
      .input('comment_id', mssql.Int, comment_id)
      .execute('GetParentCommentsByCommentProc');

    return res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
  

// Edit a Comment
const editComment = async (req, res) => {
  try {
    const { comment_id, user_id, new_comment_text } = req.body;

    const pool = await mssql.connect(sqlConfig);

    // Call the stored procedure to edit the comment
   const result = await pool.request()
      .input('comment_id', mssql.Int, comment_id)
      .input('user_id', mssql.VarChar, user_id)
      .input('new_comment_text', mssql.Text, new_comment_text)
      .execute('EditCommentProc');

    // Check if any rows were affected by the update
    if (result.rowsAffected[0] === 1) {
      return res.status(200).json({ message: 'Comment edited successfully' });
    } else {
      return res.status(404).json({ error: 'Comment not found or you do not have permission to edit it' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
// Delete a Comment (including its child comments)
const deleteComment = async (req, res) => {
  try {
    const { comment_id, user_id } = req.body;

    const pool = await mssql.connect(sqlConfig);

    // Call the stored procedure to delete the comment and its child comments
    const result = await pool.request()
      .input('comment_id', mssql.Int, comment_id)
      .input('user_id', mssql.VarChar, user_id)
      .execute('DeleteCommentProc');

   if (result.rowsAffected[0] > 0) {
      return res.status(200).json({ message: 'Comment deleted successfully' });
    } else if (result.rowsAffected[0] === 1) {
      return res.status(404).json({ error: 'Comment not found or you do not have permission to delete it' });
    } else {
      // Handle unexpected return values, if any
      return res.status(500).json({ error: 'Comment not found or you do not have permission to delete it' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};




module.exports = {
   addComment,
    getCommentsByPost,
    getCommentsByComment,
    editComment,
   deleteComment
}
