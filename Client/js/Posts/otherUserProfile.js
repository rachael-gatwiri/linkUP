document.addEventListener('DOMContentLoaded', function () {

  let id = localStorage.getItem('userId');

// User Profile Sidebar
const userProfileImg = document.getElementById('userProfileImg');
const userProfileName = document.getElementById('userProfileName');
const userProfileUsername = document.getElementById('userProfileusername');

// Get the user's ID from the URL
function getUserIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('userId');
}


// Fetch and display user posts and profile based on the user's ID
function fetchPostsAndUserProfile(userId) {
  if (!userId) {
    console.error('User email not found. Please make sure the user is logged in.');
    return;
  }
  const apiUrlPosts = `http://localhost:8005/users/getPostsByUser/${userId}`;
  const apiUrlUserProfile = `http://localhost:8005/users/getUserProfile/${userId}`;
  const apiUrlLoggedUserProfile = `http://localhost:8005/users/getUserProfile/${id}`;

  // Use Promise.all to fetch both posts and user profile data concurrently
  Promise.all([axios.get(apiUrlPosts), axios.get(apiUrlUserProfile), axios.get(apiUrlLoggedUserProfile)])
    .then(([postsResponse, userProfileResponse, loggedUserProfileResponse]) => {
      const posts = postsResponse.data;
      const userProfile = userProfileResponse.data;
      const loggedUserProfile = loggedUserProfileResponse.data;

      const postsContainer = document.getElementById('posts-container');
      postsContainer.innerHTML = '';

      posts.forEach(post => {
        const postElement = createPostElement(post, userProfile, loggedUserProfile);
        postsContainer.appendChild(postElement);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}
// Get the user's ID from the URL
let userId = getUserIdFromURL();

fetchPostsAndUserProfile(userId);

// const viewFollowingButton = document.getElementById('view-following-button');
// const viewFollowersButton = document.getElementById('view-followers-button');

// // Add click event listeners to the buttons
// viewFollowingButton.addEventListener('click', function () {
//     const user_id = viewFollowingButton.getAttribute('data-userid');
//     window.location.href = `../htmlFiles/userFollowing.html?user_id=${user_id}`;
// });

// viewFollowersButton.addEventListener('click', function () {
//     const user_id = viewFollowersButton.getAttribute('data-userid');
//     window.location.href = `../htmlFiles/userFollowers.html?user_id=${user_id}`;
// });


function createPostElement(post, userProfile, loggedUserProfile) {
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
  
  // Display user profile in the sidebar
    userProfileImg.src = loggedUserProfile.profile_image_url;
    userProfileImg.alt = 'Profile Picture';
    userProfileName.textContent =`${loggedUserProfile.first_name} ${loggedUserProfile.last_name}`;
    userProfileUsername.textContent =loggedUserProfile.username;

  // container for like and comment counts
const likeCommentContainer = document.createElement('div');
likeCommentContainer.classList.add('post', 'flex',  'mt-4', 'mb-2');
likeCommentContainer.id = 'likeCommentContainer';

// container for like count
const likeCountContainer = document.createElement('span');
likeCountContainer.classList.add('flex', 'pr-6');
likeCountContainer.id = 'likeCountContainer'; 

const likeLink = document.createElement('a');
likeLink.href = ''; // Add the correct URL for liking
const likeIcon = document.createElement('img');
likeIcon.classList.add('w-5', 'h-5');
likeIcon.src = '../Images/likeIcon.png';
likeIcon.alt = 'Like Icon';
likeLink.id = 'likeLink';
likeLink.appendChild(likeIcon);

const likeCount = document.createElement('span');
likeCount.classList.add('text-sm', 'ml-1');
likeCount.textContent = post.like_count;; 
likeCount.id = 'likeCount';

likeCountContainer.appendChild(likeLink);
likeCountContainer.appendChild(likeCount);

//container for comment count
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
viewAllCommentsContainer.classList.add('flex-col',);
viewAllCommentsContainer.id = 'viewAllCommentsContainer'; 

// "View all Comments" link
const viewAllCommentsLink = document.createElement('a');
viewAllCommentsLink.classList.add('text-sm', 'text-gray-600', 'hover:text-gray-400');
viewAllCommentsLink.href = `../htmlFiles/userComment.html?postId=${post.id}`;
viewAllCommentsLink.textContent = 'View all Comments';
viewAllCommentsLink.id = 'viewAllCommentsLink';

// textarea for adding comments
const addCommentTextarea = document.createElement('textarea');
addCommentTextarea.classList.add('mt-6', 'text-sm', 'text-gray-400', 'border-b', 'w-full', 'hover:text-gray-700',);
addCommentTextarea.name = 'addComment';
addCommentTextarea.id = 'addComment';
addCommentTextarea.placeholder = 'Add your comment here ...';
addCommentTextarea.rows = 0; 

//comment button
const addCommentButton = document.createElement('button');
addCommentButton.classList.add('text-sm', 'text-white', 'bg-blue',  'py-1', 'px-2', 'my-2', 'border-none','hover:bg-lightBlue', 'rounded-3xl');
addCommentButton.name = 'add Comment';
addCommentButton.id = 'postComment';
addCommentButton.textContent = 'Post comment';

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

  const errorMessage = document.querySelector('#postErrorCommentContainer > p.text-red-500');
  const successMessage = document.querySelector('#postErrorCommentContainer > p.text-green-500');
  const addCommentTextarea = document.querySelector('#addComment');

  axios.post(apiUrlAddComment, requestBody)
    .then(response => {
      addCommentTextarea.value = '';
      errorMessage.textContent = '';
      successMessage.textContent = 'Comment added successfully';
      setTimeout(() => {
        successMessage.textContent = '';
      }, 2000);
    })
    .catch(error => {
      console.error('Error adding comment:', error);
    });
}


})