const mssql = require('mssql');
const { sqlConfig } = require('../Config/config');

// Controller for adding a like to a post
const addLikeToPost = async (req, res) => {
  try {
    const { user_id} = req.body;
    const { post_id } = req.params;

    const pool = await mssql.connect(sqlConfig);

    // Call the modified stored procedure to add a like to the post
    const result = await pool.request()
      .input('user_id', mssql.VarChar, user_id)
      .input('post_id', mssql.Int, post_id)
      .execute('AddLikeToPostProc');

    // Check the message returned by the stored procedure
    const message = result.recordset[0].message;

    if (message === 'Like added successfully') {
      return res.status(200).json({ message: 'Post liked successfully' });
    } else {
      return res.status(400).json({ error: 'User has already liked the post' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


// Controller for removing a like from a post
const removeLikeFromPost = async (req, res) => {
  try {
    const { user_id} = req.body;
    const { post_id } = req.params;

    const pool = await mssql.connect(sqlConfig);

    // Call the stored procedure to remove the like from the post
    const result = await pool.request()
      .input('user_id', mssql.VarChar, user_id)
      .input('post_id', mssql.Int, post_id)
      .execute('RemoveLikeFromPostProc');

    // Check the message returned by the stored procedure
    const message = result.recordset[0].message;

    if (message === 'Like removed successfully') {
      return res.status(200).json({ message: 'Post unliked successfully' });
    } else {
      return res.status(400).json({ error: 'User has not liked the post' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


// Controller for getting all likes for a post
const getLikesForPost = async (req, res) => {
  try {
    const { post_id } = req.params;

    const pool = await mssql.connect(sqlConfig);

    // Call the stored procedure to get all likes for the post
    const result = await pool.request()
      .input('post_id', mssql.Int, post_id)
      .execute('GetLikesForPostProc');

    // Extract the list of user IDs from the result
    const likes = result.recordset.map((record) => record.user_id);

    return res.status(200).json(likes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  addLikeToPost,
  removeLikeFromPost,
  getLikesForPost,
};
