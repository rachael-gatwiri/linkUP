const {Router} = require('express');
const router = Router()
const {verifyToken} = require('../Middlewares/verifytoken')
const { userRegistration, login, getUserByEmail, getAllUsers, forgotPassword, resetPassword} = require('../Controllers/Auth.Controller')
const {getUserProfile, updateUserProfile} = require('../Controllers/userProfile.Controller')
const {createPost, getPostsByUser, getPostByPostId, getAllPosts, editPost, deletePost} = require('../Controllers/Posts.Controller')
const {addLikeToPost, removeLikeFromPost, getLikesForPost} = require('../Controllers/Like.Controller')
const { addComment, getCommentsByPost, getCommentsByComment, editComment, deleteComment} = require('../Controllers/Comments.Controller')
const {followUser, getFollowers,getFollowersById, getFollowing, unfollowUser,} = require('../Controllers/Follow.Controller')


//Auntentication routes
router.post('/register', userRegistration)
router.post('/login', login)
router.get('/getUserByEmail', getUserByEmail)
router.get('/getAllUsers', getAllUsers)
router.post('/verifyToken', verifyToken)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword', resetPassword)

//User Profile routes
router.get('/getUserProfile/:userId', getUserProfile,)
router.put('/updateUserProfile/:userId', updateUserProfile)

//Posts routes
router.post('/createPost', createPost)
router.get('/getPostsByUser/:userId', getPostsByUser)
router.get('/getPostByPostId/:postId', getPostByPostId)
router.get('/getAllPosts', getAllPosts)
router.put('/editPost/:postId', editPost)
router.delete('/deletePost/:userId/:postId', deletePost)

//Like and unlike routes
router.post('/addLikeToPost/:post_id', addLikeToPost)
router.post('/removeLikeFromPost/:post_id', removeLikeFromPost)
router.get('/getLikesForPost/:post_id', getLikesForPost)

//comments routes
router.post('/addComment', addComment)
router.get('/getCommentsByPost/:post_id', getCommentsByPost)
router.get('/getCommentsByComment/:comment_id', getCommentsByComment)
router.put('/editComment', editComment)
router.delete('/deleteComment', deleteComment)

//Follow and unfollow routes
router.post('/followUser', followUser)
router.get('/getFollowers/:user_id', getFollowers)
router.get('/getFollowersById/:follower_id', getFollowersById)
router.get('/getFollowing/:user_id', getFollowing)
router.post('/unfollowUser', unfollowUser)


module.exports = router