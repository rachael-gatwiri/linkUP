document.addEventListener("DOMContentLoaded", function () {
// User Profile Sidebar
const userProfileImg = document.getElementById('userProfileImg');
const userProfileName = document.getElementById('userProfileName');
const userProfileUsername = document.getElementById('userProfileusername');

let userId = localStorage.getItem('userId');
const apiUrlUserProfile = `http://localhost:8005/users/getUserProfile/${userId}`;

axios.get(apiUrlUserProfile)
  .then(userResponse => {
    const userProfileData = userResponse.data;

    // Update the sidebar elements with the user profile data
    userProfileImg.src = userProfileData.profile_image_url;
    userProfileImg.alt = 'Profile Picture';
    userProfileName.textContent = `${userProfileData.first_name} ${userProfileData.last_name}`;
    userProfileUsername.textContent = userProfileData.username;

    //update the user profile elements
    const userImg = document.getElementById('userProfile');
    userImg.src = userProfileData.profile_image_url;
    userImg.alt = 'Profile Picture';
    const userName = document.getElementById('userName');
    userName.textContent = `${userProfileData.first_name} ${userProfileData.last_name}`;

    const userUsername = document.getElementById('userusername');
    userUsername.textContent = userProfileData.username;

  })
  .catch(error => {
    console.error('Error fetching user profile:', error);
  });

// Fetch and display user posts and profile based on the user's ID
function fetchPostsAndUserProfile(userId) {
  if (!userId) {
    console.error('User email not found. Please make sure the user is logged in.');
    console.log('userId', userId)
    return;
  }
  const apiUrlPosts = `http://localhost:8005/users/getPostsByUser/${userId}`;
  const apiUrlUserProfile = `http://localhost:8005/users/getUserProfile/${userId}`;

  // Use Promise.all to fetch both posts and user profile data concurrently
  Promise.all([axios.get(apiUrlPosts), axios.get(apiUrlUserProfile)])
    .then(([postsResponse, userProfileResponse]) => {
      const posts = postsResponse.data;
      const userProfile = userProfileResponse.data;

      const postsContainer = document.getElementById('posts-container');
      postsContainer.innerHTML = '';

      posts.forEach(post => {
        const postElement = createPostElement(post, userProfile);
        postsContainer.appendChild(postElement);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

    let followingTotal = 0;
    const apiUrlIsFollowing = `http://localhost:8005/users/getFollowing/${userId}`;
    axios.get(apiUrlIsFollowing)
      .then(response => {        
          // Loop through the following data and increment followingTotal
          response.data.forEach(user => {
            followingTotal++;
          });
      })
      .finally(() => {
        document.getElementById('following_total').textContent = followingTotal;
      })
      .catch(error => {
          console.error('Error fetching following: ', error);
      });

    let followersTotal = 0;
    const apiUrlIsFollowers = `http://localhost:8005/users/getFollowers/${userId}`;
    axios.get(apiUrlIsFollowers)
      .then(response => {
          // Loop through the followers data and increment followersTotal
          response.data.forEach(user => {
            followersTotal++;
          });
      })
      .finally(() => {
        document.getElementById('followers_total').textContent = followersTotal;
      })
      .catch(error => {
          console.error('Error fetching following: ', error);
      });

      
      

}

// Call the function with the user's ID
fetchPostsAndUserProfile(userId);

const viewFollowingButton = document.getElementById('view-following-button');
const viewFollowersButton = document.getElementById('view-followers-button');

// Add click event listeners to the buttons
viewFollowingButton.addEventListener('click', function () {
  // const user_id = '06423759-615f-4155-a222-64a79cac4b04';
    const user_id = viewFollowingButton.getAttribute('data-userid');
    window.location.href = `../htmlFiles/userFollowing.html?user_id=${userId}`;
});

viewFollowersButton.addEventListener('click', function () {
    const user_id = viewFollowersButton.getAttribute('data-userid');
    window.location.href = `../htmlFiles/userFollowers.html?user_id=${userId}`;
});


function createPostElement(post, userProfile) {
  // Post section
  const postSection = document.createElement('section');
  postSection.classList.add('mt-4', 'border-b', 'border-gray-500', 'mx-4');

  // User Post Profile
const userInfoDiv = document.createElement('div');
userInfoDiv.classList.add('flex', 'items-center');
userInfoDiv.id = 'userInfoDiv';

const userLink = document.createElement('a');
userLink.href = ''; 
userLink.id = 'userLink';

const profileImg = document.createElement('img');
const userImg = document.getElementById('userProfile');
userImg.src = userProfile ? userProfile.profile_image_url : ''
profileImg.classList.add('w-16', 'h-16', 'rounded-full', 'mr-4');
profileImg.src = userProfile ? userProfile.profile_image_url : '';
profileImg.alt = 'Profile Picture';
profileImg.id = 'profileImg';

const userName = document.createElement('h3');
const userNameElement = document.getElementById('userName');
userNameElement.textContent = userProfile ? `${userProfile.first_name} ${userProfile.last_name}` : '';
userName.classList.add('text-lg', 'font-bold');
userName.textContent = userProfile ? `${userProfile.first_name} ${userProfile.last_name}` : '';
userLink.appendChild(userName);
userName.id = 'userName';

const userUsername = document.createElement('p');
const userUsernameElement = document.getElementById('userusername');
userUsernameElement.textContent = userProfile ? userProfile.username : '';
userUsername.classList.add('text-sm', 'text-gray-500');
userUsername.textContent = userProfile ? userProfile.username : '';
userLink.appendChild(userUsername);
userUsername.id = 'userUsername';

  const postContentElement = document.createElement('p');
  postContentElement.classList.add( 'text-sm');
  postContentElement.textContent = post.content;
  postContentElement.id = 'postContentElement';


   //the whole Post Container
   const postDiv = document.createElement('div');
   postDiv.classList.add('post', 'items-center', 'mb-2', 'mt-4');
    postDiv.id = 'postDiv';

   if (post.post_image_url && post.post_image_url.trim() !== '') {
    const imgElement = document.createElement('img');
    imgElement.classList.add('w-96', 'h-60');
    imgElement.id = 'postImage';
    imgElement.src = post.post_image_url;
    imgElement.alt = 'Post Image';
    postDiv.appendChild(imgElement);
  }

    // Post Content, Image and user Username
    const usernameContentContainer = document.createElement('span');
    usernameContentContainer.classList.add('flex', 'mt-1', 'items-center');
    usernameContentContainer.id = 'usernameContentContainer';

    const usernameElement = document.createElement('h4');
    usernameElement.classList.add('font-bold', 'pr-2', 'text-lg');
    usernameElement.textContent = userProfile.username; 
    usernameElement.id = 'usernameElement'
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
  
  const likeCount = document.createElement('span');
  likeCount.classList.add('text-sm', 'ml-1');
  likeCount.id = 'likeCount';
  
  let isLiked = false;
  let likesTotal = 0;
  const apiUrlIsLiked = `http://localhost:8005/users/getLikesForPost/${post.post_id}`;
  axios.get(apiUrlIsLiked)
  .then(response => {
    //loop through the followers and check if the user is following
    response.data.forEach(like => {
      likesTotal++;
      if(like === userId){
        likeIcon.src = '../Images/likeIcon.png';
        isLiked = true;
      }
    });
  })
  .finally(() => { 
    likeCount.textContent = likesTotal; 
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
  
  
  // container for the "View all Comments" link
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
  
  
  let commentTotal = 0;
  
  const apiUrlIsCommented = `http://localhost:8005/users/getCommentsByPost/${post.post_id}`;
  axios.get(apiUrlIsCommented)
  .then(response => {
    //loop through the followers and check if the user is following
    response.data.forEach(comment => {
      commentTotal++;
    });
  })
  .finally(() => {
    commentCount.textContent = commentTotal; 
  })
  
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
  
// error and success message elements
const errorMessage= document.createElement('p');
errorMessage.classList.add('text-red-500', 'text-sm', 'mt-2');
const successMessage = document.createElement('p');
successMessage.classList.add('text-green-500', 'text-sm', 'mt-2');

// postErroCommentContainer
const postErrorCommentContainer = document.createElement('div');
postErrorCommentContainer.classList.add('flex-col');
postErrorCommentContainer.id = 'postErrorCommentContainer';


//Appendings
postSection.appendChild(postDiv);
userInfoDiv.appendChild(profileImg);
userInfoDiv.appendChild(userLink);
postSection.appendChild(userInfoDiv);
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

addCommentButton.addEventListener('click', () => {
  const commentText = addCommentTextarea.value.trim();
  if (commentText) {
    addComment(post.post_id, commentText); 
  } else {
    errorMessage.textContent = 'Please enter a valid comment.';
  }
});


 return postSection;
}
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