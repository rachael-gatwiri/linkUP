const {Router} = require('express');
const router = Router()
const {verifyToken} = require('../Middlewares/verifytoken')
const {getUserByEmail, userRegistration, login, forgotPassword, resetPassword} = require('../Controllers/Auth.Controller')
const {getUserProfile, updateUserProfile} = require('../Controllers/userProfile.Controller')
const {createPost, getPostsByUser, getAllPosts, editPost, deletePost} = require('../Controllers/Posts.Controller')
const {likePost,getLikesByPost, unlikePost} = require('../Controllers/Like.Controller')
const { addComment, getCommentsByPost, editComment, deleteComment} = require('../Controllers/Comments.Controller')
const {followUser, getUserFollowers, getUserFollowing, unfollowUser,} = require('../Controllers/Follow.Controller')


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
router.get('/getAllPosts', getAllPosts)
router.put('/editPost/:postId', editPost)
router.delete('/deletePost', deletePost)

//Like and unlike routes
router.post('/likePost', likePost)
router.get('/getLikesByPost/:postId', getLikesByPost)
router.delete('/unlikePost', unlikePost)

//comments routes
router.post('/addComment', addComment)
router.get('/getCommentsByPost/:postId', getCommentsByPost)
router.put('/editComment/:commentId', editComment)
router.delete('/deleteComment/:commentId', deleteComment)

//Follow and unfollow routes
router.post('/followUser', followUser)
router.get('/getUserFollowers/:userId', getUserFollowers)
router.get('/getUserFollowing/:userId', getUserFollowing)
router.delete('/unfollowUser', unfollowUser)


module.exports = router