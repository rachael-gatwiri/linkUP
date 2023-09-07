const express = require('express');
const mssql = require('mssql');
const { sqlConfig } = require('../Config/config');

// Fetch all comments for a specific post
const getCommentsByPost = async (req, res) => {
    const postId = req.params.postId;

    if (!postId) {
        return res.status(400).json({ error: 'Post ID is required' });
    }

    try {
        const pool = await mssql.connect(sqlConfig);
        const result = await pool.request()
            .input('postId', mssql.Int, postId)
            .execute('GetCommentsByPostPROC');

        const comments = result.recordset;

        return res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// Add a comment to a post or another comment
const addComment = async (req, res) => {
    const { userId, postId, parentCommentId, content } = req.body;

    if (!userId || !postId || !content) {
        return res.status(400).json({ error: 'User ID, Post ID, and Content are required' });
    }

    try {
        const pool = await mssql.connect(sqlConfig);
        const result = await pool.request()
            .input('userId', mssql.VarChar, userId)
            .input('postId', mssql.Int, postId)
            .input('parentCommentId', mssql.Int, parentCommentId)
            .input('content', mssql.Text, content)
            .execute('AddCommentPROC');

        if (result.rowsAffected[0] === 1) {
            return res.status(201).json({ message: 'Comment added successfully' });
        } else {
            return res.status(500).json({ error: 'Failed to add the comment' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// Edit a user's comment
const editComment = async (req, res) => {
    const { userId, commentId, content } = req.body;

    if (!userId || !commentId || !content) {
        return res.status(400).json({ error: 'User ID, Comment ID, and Content are required' });
    }

    try {
        const pool = await mssql.connect(sqlConfig);
        const result = await pool.request()
            .input('userId', mssql.VarChar, userId)
            .input('commentId', mssql.Int, commentId)
            .input('content', mssql.Text, content)
            .execute('EditCommentPROC');

        if (result.rowsAffected[0] === 1) {
            return res.status(200).json({ message: 'Comment edited successfully' });
        } else {
            return res.status(500).json({ error: 'Failed to edit the comment' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// Delete a user's comment
const deleteComment = async (req, res) => {
    const { userId, commentId } = req.body;

    if (!userId || !commentId) {
        return res.status(400).json({ error: 'User ID and Comment ID are required' });
    }

    try {
        const pool = await mssql.connect(sqlConfig);
        const result = await pool.request()
            .input('userId', mssql.VarChar, userId)
            .input('commentId', mssql.Int, commentId)
            .execute('DeleteCommentPROC');

        if (result.rowsAffected[0] === 1) {
            return res.status(200).json({ message: 'Comment deleted successfully' });
        } else {
            return res.status(500).json({ error: 'Failed to delete the comment' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getCommentsByPost,
    addComment,
    editComment,
    deleteComment
}
