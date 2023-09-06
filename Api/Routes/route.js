const {Router} = require('express');
const router = Router()
const {getUserByEmail, userRegistration, login, forgotPassword, resetPassword} = require('../Controllers/Auth.Controller')
const {verifyToken} = require('../Middlewares/verifytoken')


//Auntentication routes
router.post('/getUserByEmail', getUserByEmail)
router.post('/register', userRegistration)
router.post('/login', login)
router.post('/verifyToken', verifyToken)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword', resetPassword)

module.exports = router