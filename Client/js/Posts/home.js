// Function to fetch comments for a post and update the comment count
function fetchCommentsAndUpdateCount(postId) {
  const apiUrlComments = `http://localhost:8005/users/getCommentsByPost/${postId}`;
  const commentCountElement = document.getElementById('commentCount');

  axios.get(apiUrlComments)
    .then(commentsResponse => {
      const comments = commentsResponse.data;
      const commentCount = comments.length;
      if (commentCount === 1) {
        commentCountElement.textContent = '1 comment';
      } else if (commentCount > 1) {
        commentCountElement.textContent = `${commentCount} comments`;
      } else {
        commentCountElement.textContent = ''; 
      }
      const commentsContainer = document.getElementById('commentsContainer'); // Container to hold comments
      comments.forEach(comment => {
        const commentElement = createCommentElement(comment);
        commentsContainer.appendChild(commentElement);
      });
    })
    .catch(error => {
      console.error('Error fetching comments:', error);
    });
}

document.addEventListener('DOMContentLoaded', function () {
// User Profile Sidebar
const userProfileImg = document.getElementById('userProfileImg');
const userProfileName = document.getElementById('userProfileName');
const userProfileUsername = document.getElementById('userProfileusername');

let userId = localStorage.getItem('userId');

// Fetching all posts from the database
function fetchAllPosts() {
  const apiUrlPosts = 'http://localhost:8005/users/getAllPosts';

  axios.get(apiUrlPosts)
    .then(postsResponse => {
      const posts = postsResponse.data;

      const postsContainer = document.getElementById('posts-container');
      postsContainer.innerHTML = '';

      posts.forEach(post => {
        // Here, we don't have user profile data, so pass null for userProfile
        const postElement = createPostElement(post, null);
        postsContainer.appendChild(postElement);
        // Call the function to handle likes and comments for this post
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

const apiUrlUserProfile = `http://localhost:8005/users/getUserProfile/${userId}`;

axios.get(apiUrlUserProfile)
  .then(userResponse => {
    const userProfileData = userResponse.data;

    // Update the sidebar elements with the user profile data
    userProfileImg.src = userProfileData.profile_image_url;
    userProfileImg.alt = 'Profile Picture';
    userProfileName.textContent = `${userProfileData.first_name} ${userProfileData.last_name}`;
    userProfileUsername.textContent = userProfileData.username;
  })
  .catch(error => {
    console.error('Error fetching user profile:', error);
  });


fetchAllPosts();

function createPostElement(post) {
  const postSection = document.createElement('section');
  postSection.classList.add('mt-4', 'border-b', 'border-gray-500', 'mx-4');


  // Extract user profile data from the post object
  const userProfile = {
    first_name: post.user_first_name,
    last_name: post.user_last_name,
    username: post.user_username,
    profile_image_url: post.user_profile_image_url,
  };

  // Create elements for user profile information
  const profileImg = document.createElement('img');
  profileImg.classList.add('w-16', 'h-16', 'rounded-full', 'mr-4');
  profileImg.src = userProfile ? userProfile.profile_image_url : '';
  profileImg.alt = 'Profile Picture';
  profileImg.id = 'profileImg';

  const userInfoDiv = document.createElement('div');
  userInfoDiv.classList.add('flex', 'items-center');
  userInfoDiv.id = 'userInfoDiv';

  const userLink = document.createElement('a');
  userLink.addEventListener('click', (event) => {
    event.preventDefault();
    if (post.user_id === userId) {
      // Redirect to the logged-in user's profile page
      window.location.href = '../htmlFiles/userProfile.html';
    } else {
      // Redirect to the other user's profile page
      window.location.href = `./otherUserProfile.html?userId=${post.user_id}`;
    }
  });
  userLink.id = 'userLink';

  const userName = document.createElement('h3');
  userName.classList.add('text-lg', 'font-bold');
  userName.textContent = `${userProfile.first_name} ${userProfile.last_name}`;
  userLink.appendChild(userName);
  userName.id = 'userName';

  const userUsername = document.createElement('p');
  userUsername.classList.add('text-sm', 'text-gray-500');
  userUsername.textContent = userProfile.username;
  userLink.appendChild(userUsername);
  userUsername.id = 'userUsername';

  let isFollowingUser = false;
  let followStatus = document.createElement('button');
  followStatus.id = 'followStatus';
  followStatus.textContent = 'Follow';
  followStatus.classList.add('Follow', 'text-sm', 'text-white', 'bg-blue', 'py-1', 'px-2', 'border-none', 'hover:bg-lightBlue', 'rounded');
  if (post.user_id === userId) {
    followStatus.style.display = 'none';
  } else {
    followStatus.style.display = 'block';
  }

  const apiUrlIsFollowing = `http://localhost:8005/users/getFollowers/${post.user_id}`;
  axios.get(apiUrlIsFollowing)
  .then(response => {
    //loop through the followers and check if the user is following
    response.data.forEach(follower => {
      if(follower.follower_id === userId){
        followStatus.textContent = 'Following';
      }
    });

  })
  .catch(error => {
    console.error('Error checking if user is following:', error);
  });  
 
  let isFollowing = post.isFollowing;
  let ownerUserId = post.user_id;

  followStatus.addEventListener('click', () => {
    if (isFollowing) {
      unfollowUser(ownerUserId);
      isFollowing = false; // User is now unfollowing
      followStatus.textContent = 'Follow'; // Update the button text
      followStatus.classList.remove('following', 'bg-blue', 'text-primary');
    } else {
      followUser(ownerUserId);
      isFollowing = true; // User is now following
      followStatus.textContent = 'Following'; // Update the button text
      followStatus.classList.add('following', 'bg-gray-500', 'text-secondary');
    }
    
    updateFollowButtonUI(isFollowing);
  });

  

  //create a container for userinfodiv and followstatus
  const userInfoFollowContainer = document.createElement('div');
  userInfoFollowContainer.classList.add('flex', 'justify-between', 'items-center', 'mb-1');
  userInfoFollowContainer.id = 'userInfoFollowContainer';

 
// Create a container for the username and post content
const usernameContentContainer = document.createElement('span');
usernameContentContainer.classList.add('flex', 'mt-1', 'items-center');
usernameContentContainer.id = 'usernameContentContainer';

const usernameElement = document.createElement('h4');
usernameElement.classList.add('font-bold', 'pr-2', 'text-lg');

// Create a link to the other user's profile page
const userProfileLink = document.createElement('a');
userProfileLink.href = '';
userProfileLink.addEventListener('click', (event) => {
  event.preventDefault();
});
userProfileLink.textContent = userProfile.username;
usernameElement.appendChild(userProfileLink);


usernameContentContainer.appendChild(usernameElement);

  const postContentElement = document.createElement('p');
  postContentElement.classList.add( 'text-sm');
  postContentElement.textContent = post.content;
  postContentElement.id = 'postContentElement';

   // Create a container for the post content
   const postDiv = document.createElement('div');
   postDiv.classList.add('post', 'items-center', 'mb-2');
    postDiv.id = 'postDiv';

   if (post.post_image_url && post.post_image_url.trim() !== '') {
    const imgElement = document.createElement('img');
    imgElement.classList.add('w-96', 'h-60');
    imgElement.id = 'postImage';
    imgElement.src = userProfile ? post.post_image_url : '';
    imgElement.alt = 'Post Image';
    postDiv.appendChild(imgElement);
  }


  // Create the container for like and comment counts
const likeCommentContainer = document.createElement('div');
likeCommentContainer.classList.add('post', 'flex',  'mt-4');
likeCommentContainer.id = 'likeCommentContainer';

// Create the container for like count
const likeCountContainer = document.createElement('span');
likeCountContainer.classList.add('flex', 'pr-6');
likeCountContainer.id = 'likeCountContainer'; 

const likeLink = document.createElement('a');
likeLink.href = '';
const likeIcon = document.createElement('img');
likeIcon.classList.add('w-5', 'h-5');
likeIcon.src = '../Images/unlike.png';
likeIcon.alt = 'Like Icon';
likeLink.id = 'likeLink';

let isLiked = false;
const apiUrlIsLiked = `http://localhost:8005/users/getLikesForPost/${post.post_id}`;
axios.get(apiUrlIsLiked)
.then(response => {
  //loop through the followers and check if the user is following
  response.data.forEach(like => {
    if(like === userId){
      likeIcon.src = '../Images/likeIcon.png';
      isLiked = true;
    }
  });
})
.catch(error => {
  console.error('Error checking if user is following:', error);
})

//like logic
let postId = post.post_id;

likeLink.addEventListener('click', () => {
  if (isLiked) {
    handleUnlike(postId);
    isLiked = false; 
    likeIcon.src = '../Images/unlike.png';
  } else {
    handleLike(postId);
    isLiked = true; 
    likeIcon.src = '../Images/likeIcon.png'; 
  }
  
  updateLikeButtonUI(isLiked);
})

likeLink.appendChild(likeIcon);

const likeCount = document.createElement('span');
likeCount.classList.add('text-sm', 'ml-1');
likeCount.textContent = post.like_count;; 
likeCount.id = 'likeCount';

likeCountContainer.appendChild(likeLink);
likeCountContainer.appendChild(likeCount);


// Create the container for comment count
const commentCountContainer = document.createElement('span');
commentCountContainer.classList.add('flex');
commentCountContainer.id = 'commentCountContainer';

const commentLink = document.createElement('a');
commentLink.href = ''; // Add the correct URL for commenting
const commentIcon = document.createElement('img');
commentIcon.classList.add('w-5', 'h-5');
commentIcon.src = '../Images/comment.png';
commentIcon.alt = 'Comment Icon';
commentLink.id = 'commentLink';
commentLink.appendChild(commentIcon);

const commentCount = document.createElement('span');
commentCount.classList.add('text-sm', 'ml-1');
commentCount.textContent = post.comment_count;
commentCount.id = 'commentCount';

// ontainer for the "View all Comments" link
const viewAllCommentsContainer = document.createElement('div');
viewAllCommentsContainer.classList.add('flex-col');
viewAllCommentsContainer.id = 'viewAllCommentsContainer'; 

//  "View all Comments" link
const viewAllCommentsLink = document.createElement('a');
viewAllCommentsLink.classList.add('text-sm', 'text-gray-600', 'hover:text-gray-400');
viewAllCommentsLink.href = `../htmlFiles/userComment.html?postId=${post.post_id}&userId=${post.user_id}`;
viewAllCommentsLink.textContent = 'View all Comments';
viewAllCommentsLink.id = 'viewAllCommentsLink';

// textarea for adding comments
const addCommentTextarea = document.createElement('textarea');
addCommentTextarea.classList.add('mt-6', 'text-sm', 'text-gray-400', 'border-b', 'w-full', 'hover:text-gray-700',);
addCommentTextarea.name = 'addComment';
addCommentTextarea.id = 'addComment';
addCommentTextarea.placeholder = 'Add your comment here ...';
addCommentTextarea.rows = 0; 

//add comment button
const addCommentButton = document.createElement('button');
addCommentButton.classList.add('text-sm', 'text-white', 'bg-blue',  'py-1', 'px-2', 'border-none','hover:bg-lightBlue', 'rounded-3xl');
addCommentButton.name = 'add Comment';
addCommentButton.id = 'postComment';
addCommentButton.textContent = 'Post comment';

addCommentButton.addEventListener('click', () => {
  const commentText = addCommentTextarea.value.trim();
  if (commentText) {
    addComment(post.post_id, commentText); 
    successMessage.textContent = 'Comment added successfully';
  } else {
    errorMessage.textContent = 'Please enter a valid comment.';
  } setTimeout(() => {
    errorMessage.textContent = '';
    successMessage.textContent = '';
  } , 2000);
});




// Get the error and success message elements
const errorMessage= document.createElement('p');
errorMessage.classList.add('text-red-500', 'text-sm', 'mt-2');
const successMessage = document.createElement('p');
successMessage.classList.add('text-green-500', 'text-sm', 'mt-2');

// create postErroCommentContainer
const postErrorCommentContainer = document.createElement('div');
postErrorCommentContainer.classList.add('flex-col');
postErrorCommentContainer.id = 'postErrorCommentContainer';


//Appendings
postSection.appendChild(postDiv);
userInfoDiv.appendChild(profileImg);
userInfoDiv.appendChild(userLink);
userInfoFollowContainer.appendChild(userInfoDiv);
userInfoFollowContainer.appendChild(followStatus);
postSection.appendChild(userInfoFollowContainer);
postSection.appendChild(postDiv);
postDiv.appendChild(usernameContentContainer)
postDiv.appendChild(likeCommentContainer);
postDiv.appendChild(viewAllCommentsContainer);
viewAllCommentsContainer.appendChild(viewAllCommentsLink);
viewAllCommentsContainer.appendChild(addCommentTextarea);
postDiv.appendChild(postErrorCommentContainer);
postErrorCommentContainer.appendChild(errorMessage);
postErrorCommentContainer.appendChild(successMessage);
postErrorCommentContainer.appendChild(addCommentButton);



usernameContentContainer.appendChild(usernameElement);
usernameContentContainer.appendChild(postContentElement);

commentCountContainer.appendChild(commentLink);
commentCountContainer.appendChild(commentCount);

likeCommentContainer.appendChild(likeCountContainer);
likeCommentContainer.appendChild(commentCountContainer);

 return postSection;
}

function filterPosts(searchTerm) {
  const postsContainer = document.getElementById('posts-container');
  const postElements = postsContainer.getElementsByClassName('post');

  Array.from(postElements).forEach(postElement => {
    const postContent = postElement.textContent.toLowerCase();
    const userProfileElement = postElement.querySelector('.user-profile');

    if (postContent.includes(searchTerm.toLowerCase())) {
      postElement.style.display = 'block';
      if (userProfileElement) {
        userProfileElement.style.display = 'block';
      }
    } else {
      postElement.style.display = 'none';
      if (userProfileElement) {
        userProfileElement.style.display = 'none';
      }
    }
  });
}

// Event listener for search input
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.trim();
  filterPosts(searchTerm);
});


function addComment(postId, commentText) {
  const apiUrlAddComment = 'http://localhost:8005/users/addComment';
  const requestBody = {
    post_id: postId,
    user_id: userId,
    comment_text: commentText,
  };

  const addCommentTextarea = document.querySelector('#addComment');

  axios.post(apiUrlAddComment, requestBody)
    .then(response => {
      addCommentTextarea.value = '';
    })
    .catch(error => {
      console.error('Error adding comment:', error);
    });
}

function updateFollowButtonUI(isFollowing) {
  const followStatus = document.getElementById('followStatus'); 
  if (isFollowing) {
    followStatus.textContent = 'Following';
  } else {
    followStatus.textContent = 'Follow';
  }
}


function followUser(ownerUserId) {
  axios.post('http://localhost:8005/users/followUser', { follower_id: userId, following_id: ownerUserId })
    .then(response => {
      const result = response.data.result;
      if (result === 1 || result === 2) {
        isFollowing = !isFollowing; // Toggle the isFollowing state
        updateFollowButtonUI(isFollowing);
      } else if (result === 0) {
        console.log('User is already following this user.');
      } else {
        console.log('Follow failed for some reason.');
      }
    })
    .catch(error => {
      console.error('Error following user:', error);
    });
}

function unfollowUser(ownerUserId) {
  axios.post('http://localhost:8005/users/unfollowUser', { follower_id: userId, following_id: ownerUserId })
    .then(response => {
      console.log(response)
      const result = response.data.result;
      if (result === 1 || result === 2) {
        isFollowing = !isFollowing; // Toggle the isFollowing state
        updateFollowButtonUI(isFollowing);
      } else if (result === 0) {
        console.log('User is not following this user.');
      } else {
        console.log('Unfollow failed for some reason.');
      }
    })
    .catch(error => {
      console.error('Error unfollowing user:', error);
    });
}

//function to update the like button and count
function updateLikeButtonUI(isLiked) {
  const likeIcon = document.querySelector('#likeIcon');
  const likeCount = document.querySelector('#likeCount');
  if (isLiked) {
    likeIcon.src = '../Images/likeIcon.png';
    likeCount.textContent = parseInt(likeCount.textContent) + 1;
  } else {
    likeIcon.src = '../Images/unlike.png';
    likeCount.textContent = parseInt(likeCount.textContent) - 1;
  }
}

//function to handle like
function handleLike(postId) {
  const apiUrlLike = `http://localhost:8005/users/addLikeToPost/${postId}`;
  axios.post(apiUrlLike, { user_id: userId })
    .then(response => {
      const result = response.data.result;
      if (result === 1) {
        isLiked = true; // Toggle the isLiked state
        updateLikeButtonUI(isLiked);
      } else if (result === 0) {
        console.log('User has already liked this post.');
      } else {
        console.log('Like failed for some reason.');
      }
    })
    .catch(error => {
      console.error('Error liking post:', error);
    });
  }

  //function to handle unlike
function handleUnlike(postId) {
  const apiUrlUnlike = `http://localhost:8005/users/removeLikeFromPost/${postId}`;
  axios.post(apiUrlUnlike, { user_id: userId })
    .then(response => {
      const result = response.data.result;
      if (result === 1) {
        isLiked = false; // Toggle the isLiked state
        updateLikeButtonUI(isLiked);
      } else if (result === 0) {
        console.log('User has not liked this post.');
      } else {
        console.log('Unlike failed for some reason.');
      }
    })
    .catch(error => {
      console.error('Error unliking post:', error);
    });
  }

})