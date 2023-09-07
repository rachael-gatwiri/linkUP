const express = require('express');
const mssql = require('mssql');
const { sqlConfig } = require('../Config/config');

// Follow a user
const followUser = async (req, res) => {
    const { followerUserId, followeeUserId } = req.body;

    if (!followerUserId || !followeeUserId) {
      return res.status(400).json({ error: 'Follower user ID and followee user ID are required' });
    }

    const pool = await mssql.connect(sqlConfig);

    // Insert a follow relationship into the database
    const result = await pool.request()
      .input('followerUserId', mssql.VarChar, followerUserId)
      .input('followeeUserId', mssql.VarChar, followeeUserId)
      .execute('followUserProc');

    // Check if the follow relationship was successfully added
    if (result.rowsAffected[0] === 1) {
      return res.status(200).json({ message: 'User followed successfully' });
    } else {
      return res.status(500).json({ error: 'Failed to follow the user' });
    } 
};

// Unfollow a user
const unfollowUser = async (req, res) => {
    const { followerUserId, followeeUserId } = req.body;

    if (!followerUserId || !followeeUserId) {
        return res.status(400).json({ error: 'Follower user ID and followee user ID are required' });
    }

    const pool = await mssql.connect(sqlConfig);

    // Delete a follow relationship from the database
    const result = await pool.request()
        .input('followerUserId', mssql.VarChar, followerUserId)
        .input('followeeUserId', mssql.VarChar, followeeUserId)
        .execute('unfollowUserProc');
        
    // Check if the follow relationship was successfully deleted
    if (result.rowsAffected[0] === 1) {
        return res.status(200).json({ message: 'User unfollowed successfully' });
    } else {
        return res.status(500).json({ error: 'Failed to unfollow the user' });
    }
};

// Get user followers
const getUserFollowers = async (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const pool = await mssql.connect(sqlConfig);

    // Fetch all followers for the specified user
    const result = await pool.request()
      .input('userId', mssql.VarChar, userId)
      .execute('getUserFollowersProc');

    return res.status(200).json(result.recordset);
};

// Get users the user is following
const getUserFollowing = async (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const pool = await mssql.connect(sqlConfig);

    // Fetch all users that the specified user is following
    const result = await pool.request()
      .input('userId', mssql.VarChar, userId)
      .execute('getUserFollowingProc');

    return res.status(200).json(result.recordset);
};

module.exports = {
    followUser,
    unfollowUser,
    getUserFollowers,
    getUserFollowing
};
