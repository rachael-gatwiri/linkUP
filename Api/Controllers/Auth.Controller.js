// signup and signin controller

const mssql = require('mssql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4 } = require('uuid')
const {sqlConfig} = require('../Config/config')
const{hashedPwd} = require('../Utilis/hashedPwd')
const{createToken}= require('../Utilis/tokenGen')
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { emailConfig } = require('../Config/emailConfig'); // Import your email configuration
// const { registrationSchema, loginSchema } = require('../Validators/Auth.validators')

const userRegistration = async (req, res) => {
    try{
        const id = v4()
        const { firstName, lastName, username, email, password } = req.body
        if (!firstName || !lastName || !username|| !email || !password){
            return res.status(400).json({error: 'Please input all values'})
        }
        const pool = await mssql.connect(sqlConfig)
        const checkEmailQuery = await pool
        .request()
        .input('email', email)
        .execute('fetchUserByEmailPROC')
        if(checkEmailQuery.rowsAffected[0] == 1){
            return res.status(400).json({error: 'Account creation failed! This email is already registered'})   
        }

        const hashedPwd = await bcrypt.hash(password, 5)

        await pool.request()
        .input('id', id)
        .input('first_name', mssql.VarChar, firstName)
        .input('last_name', mssql.VarChar, lastName)
        .input('username', mssql.VarChar, username)
        .input('email', mssql.VarChar, email)
        .input('password', mssql.VarChar, hashedPwd)
        .execute('createNewLinkUpUserPROC')

        const token = jwt.sign({email}, process.env.SECRET_KEY, {  expiresIn: 24*60*60 })
        return res.status(201).json({message: 'Account created successfully', token})
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error: `Internal server error, ${error.message}`})
    }
}



const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if(!req.body){
            return res.status(400).json({error: 'The request body can not be empty'})
        } else {
            // check if email is registered
            const pool = await mssql.connect(sqlConfig)
            const checkEmailQuery = await pool
            .request()
            .input('email', email)
            .execute('fetchUserByEmailPROC')

            if(checkEmailQuery.rowsAffected[0] == 0){
                return res.status(400).json({error: 'This email is not registered'})
            } else {
                const valid = await bcrypt.compare(password, checkEmailQuery.recordset[0].password)
                if(valid){
                    const token = jwt.sign({email: checkEmailQuery.recordset[0].email}, process.env.SECRET_KEY, {
                        expiresIn: 24*60*60
                    })
                    const {password, ...user} = checkEmailQuery.recordset[0]
                    return res.status(200).json({message: 'Login successful', token, user})
                } else {
                    return res.status(400).json({error: 'Password is incorrect'})
                }
            }
        }
    } catch(error){
        console.log(error.message);
        return res.status(500).json({error: `Internal server error, ${error.message}`})
    }
}

const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.body;

        const pool = await mssql.connect(sqlConfig);
        const result = await pool.request()
            .input('email', email)
            .execute('fetchUserByEmailPROC');
        
    return res.status(200).json(result.recordset[0]);
    }catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Get All Users
const getAllUsers = async (req, res) => {
    try {
      const pool = await mssql.connect(sqlConfig);
  
      // Fetch all users from the database
      const result = await pool.request()
       .execute('GetAllUsersProc')
  
      return res.status(200).json(result.recordset);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

// POST /users/forgot-password
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Please input your email' });
        }

        const user = await getUserByEmail(email);
        
        if (!user) {
            return res.status(400).json({ error: 'Email not found' });
        }
        // Generate a dedicated reset token
        const payload = { email: user.email }; 
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });
        function resetPasswordLink(token) {

            // actual URL of reset password page
            const resetPasswordUrl = `http://127.0.0.1:5501/Client/htmlFiles/resetPwd.html?token=${token}`;
            return resetPasswordUrl;
        }

        const pool = await mssql.connect(sqlConfig);
        await pool.request()
            .input('email', email)
            .input('token', token)
            .execute('genPwdResetTokenPROC'); 

        const transporter = nodemailer.createTransport({
            host: emailConfig.host,
            port: emailConfig.port,
            secure: false, 
            auth: {
                user: emailConfig.auth.user,
                pass: emailConfig.auth.pass
            }
        });

        const mailOptions = {
            from: emailConfig.auth.user, // Sender email address
            to: email, // Recipient email address
            subject: 'Linkup Password Reset', // Email subject
            html: `<h1>Hi ${user.first_name},</h1>
            <p>Please click on the link below to reset your password:</p>
            <a href="${resetPasswordLink(token)}">Reset Password</a>`, // Email content as HTML
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(400).json({ error: error.message });
            } else {
                return res.status(200).json({ message: 'Email sent successfully' });
            }
        });
    } catch (error) {
        return res.status(500).json({ error: `Internal server error, ${error.message}` });
    }
};

// POST /users/reset-password
const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ error: 'Token and newPassword are required' });
        }

        // Verify the token and extract the email from it
        let email;
        try {
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            email = decodedToken.email;
        } catch (error) {
            return res.status(400).json({ error: 'Invalid or expired token. Please request a new password reset.' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the password in the database
        const pool = await mssql.connect(sqlConfig);
        const result = await pool.request()
            .input('email', email)
            .input('token', token)
            .input('newPassword', hashedPassword)
            .execute('resetPwdPROC');

        // Check if the password reset was successful
        if (result.rowsAffected[0] === 1) {
            return res.status(200).json({ message: 'Password reset successfully.' });
        } else {
            return res.status(400).json({ error: 'Password reset failed. Please request a new password reset.' });
        }
    } catch (error) {
        return res.status(500).json({ error: `Internal server error, ${error.message}` });
    }
};

module.exports = {
    userRegistration,
    login,
    getUserByEmail,
    getAllUsers,
    forgotPassword,
    resetPassword
} 