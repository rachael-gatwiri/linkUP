const mssql = require('mssql');
const { sqlConfig } = require('../Config/config');

// Follow a User
const followUser = async (req, res) => {
  try {
    const { follower_id, following_id } = req.body;

    const pool = await mssql.connect(sqlConfig);

    // Check if the relationship already exists to avoid duplicates
    const existingRelationship = await pool.request()
    .input('follower_id', mssql.VarChar, follower_id)
    .input('following_id', mssql.VarChar, following_id)
    .query('SELECT 1 FROM FollowersTable WHERE follower_id = @follower_id AND following_id = @following_id');
  
  if (existingRelationship.rowsAffected[0] === 0) {
    // Insert the relationship if it doesn't exist
    await pool.request()
      .input('follower_id', mssql.VarChar, follower_id)
      .input('following_id', mssql.VarChar, following_id)
      .execute('followUserPROC');
    return res.status(200).json({ message: 'User followed successfully' });
  } else {
    // Handle the case where the relationship already exists
    return res.status(400).json({ error: 'User is already followed' });
  } 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



// Unfollow a User
const unfollowUser = async (req, res) => {
  try {
    const { follower_id, following_id } = req.body;

    const pool = await mssql.connect(sqlConfig);

    if (follower_id === following_id) {
      return res.status(400).json({ error: 'You cannot unfollow yourself' });
    }

    // Check if the relationship exists to avoid errors
    const existingRelationship = await pool.request()
      .input('follower_id', mssql.VarChar, follower_id)
      .input('following_id', mssql.VarChar, following_id)
      .query('SELECT 1 FROM FollowersTable WHERE follower_id = @follower_id AND following_id = @following_id');

  if (existingRelationship.rowsAffected[0] !== 0) {
    // Delete the relationship if it exists
    await pool.request()
      .input('follower_id', mssql.VarChar, follower_id)
      .input('following_id', mssql.VarChar, following_id)
      .execute('UnfollowUserPROC')
    return res.status(200).json({ message: 'User unfollowed successfully' });
  } else {
    // Handle the case where the relationship doesn't exist
    return res.status(400).json({ error: 'User is not followed' });
  } 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

 


// Get Followers of a User
const getFollowers = async (req, res) => {
  try {
    const { user_id } = req.params;

    const pool = await mssql.connect(sqlConfig);

    // Retrieve the list of users who are following the specified user
    const result = await pool.request()
      .input('user_id', mssql.VARCHAR(255), user_id)
      .execute('GetFollowersPROC')
    return res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



// Get Users Followed by a User
const getFollowing = async (req, res) => {
  try {
    const { user_id } = req.params;

    const pool = await mssql.connect(sqlConfig);

    // Retrieve the list of users followed by the specified user
    const result = await pool.request()
      .input('user_id', mssql.VarChar, user_id)
      .execute('GetFollowingPROC')

    return res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
};
