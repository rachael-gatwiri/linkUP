const express = require('express');
const mssql = require('mssql');
const { sqlConfig } = require('../Config/config');


const getUserProfile = async (req, res) => {
  const userId = req.params.userId;
  // console.log(userId);
  try {
    const pool = await mssql.connect(sqlConfig);
    const result = await pool.request()
      .input('UserId', mssql.VARCHAR(255), userId)
      .execute('getUserProfileProc');

    // console.log('Result:', result);

    const userProfile = result.recordset[0]; // Access the first record

    // console.log('User Profile:', userProfile);

    if (!userProfile) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(userProfile);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




// Function for editing a user's profile
const updateUserProfile = async (req, res) => {
  const userId = req.params.userId;
  const { first_name, last_name, profile_image_url } = req.body;
  
  try {
    const pool = await mssql.connect(sqlConfig)
    await pool.request()
        .input('userId', mssql.VARCHAR(255), userId)
        .input('firstName', mssql.NVarChar(50), first_name)
        .input('lastName', mssql.NVarChar(50), last_name)
        .input('profileImageUrl', mssql.NVarChar(200), profile_image_url)
        .execute('updateUserProfileProc');
        // console.log(error.message)
    res.status(200).json({ message: 'User profile edited successfully' });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};

