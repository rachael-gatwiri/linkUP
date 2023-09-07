const {Router} = require('express');
const router = Router()
const {verifyToken} = require('../Middlewares/verifytoken')
const {getUserByEmail, userRegistration, login, forgotPassword, resetPassword} = require('../Controllers/Auth.Controller')
const {getUserProfile, updateUserProfile} = require('../Controllers/userProfile.Controller')
const {createPost, getPostsByUser, editPost, deletePost} = require('../Controllers/Posts.Controller')
const {getAllLikes, likePost, unlikePost} = require('../Controllers/Like.Controller')
const {getCommentsByPost, addComment, editComment, deleteComment} = require('../Controllers/Comments.Controller')
const {followUser, unfollowUser, getUserFollowers, getUserFollowing} = require('../Controllers/Follow.Controller')


//Auntentication routes
router.post('/getUserByEmail', getUserByEmail)
router.post('/register', userRegistration)
router.post('/login', login)
router.post('/verifyToken', verifyToken)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword', resetPassword)

//User Profile routes
router.get('/getUserProfile/:userId', getUserProfile,)
router.put('/updateUserProfile/:userId', updateUserProfile)

//Posts routes
router.post('/createPost', createPost)
router.get('/getPostsByUser/:userId', getPostsByUser)
router.put('/editPost/:postId', editPost)
router.delete('/deletePost/:postId', deletePost)

//Like and unlike routes
router.post('/likePost/:postId', likePost)
router.get('/getAllLikes', getAllLikes)
router.delete('/unlikePost/:postId', unlikePost)

//comments routes
router.get('/getCommentsByPost/:postId', getCommentsByPost)
router.post('/addComment', addComment)
router.put('/editComment/:commentId', editComment)
router.delete('/deleteComment/:commentId', deleteComment)

//Follow and unfollow routes
router.post('/followUser', followUser)
router.delete('/unfollowUser', unfollowUser)
router.get('/getUserFollowers/:userId', getUserFollowers)
router.get('/getUserFollowing/:userId', getUserFollowing)


module.exports = router