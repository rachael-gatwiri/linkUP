// Get the URL query string (e.g., "?postId=2063")
const queryString = window.location.search;

// Use a function to parse the query string and extract parameters
function getParameterValue(parameterName) {
  const parameters = new URLSearchParams(queryString);
  return parameters.get(parameterName);
}

// Get the value of the "postId" parameter
const postId = getParameterValue("postId");
const userId = getParameterValue("userId");

document.addEventListener("DOMContentLoaded", function () {
  
  
    // API endpoints for fetching comments, user posts, and user profile
    const apiUrlPost = `http://localhost:8005/users/getPostByPostId/${postId}`;
    const apiUrlComments = `http://localhost:8005/users/getCommentsByPost/${postId}`;
    const apiUrlPosts = `http://localhost:8005/users/getPostsByUser/${userId}`;
    const apiUrlUserProfile = `http://localhost:8005/users/getUserProfile/${userId}`;
  
    // Function to fetch user profile information
    function fetchCurrentPost() {
      return fetch(apiUrlPost)
        .then((response) => response.json())
        .catch((error) => {
          console.error('Error fetching post:', error);
          return {};
        });
    }

    // Function to fetch user profile information
    function fetchUserProfile(userId) {
      return fetch(apiUrlUserProfile)
        .then((response) => response.json())
        .catch((error) => {
          console.error('Error fetching user profile:', error);
          return {};
        });
    }
  
    // Function to fetch comments
    function fetchComments() {
      return fetch(apiUrlComments)
        .then((response) => response.json())
        .catch((error) => {
          console.error('Error fetching comments:', error);
          return [];
        });
    }
    let loggedUserId = localStorage.getItem('userId');
    const apiUserProfile = `http://localhost:8005/users/getUserProfile/${loggedUserId}`;
    // User Profile Sidebar
const userProfileImg = document.getElementById('userProfileImg');
const userProfileName = document.getElementById('userProfileName');
const userProfileUsername = document.getElementById('userProfileusername');

axios.get(apiUserProfile)
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
  
    // Function to create a comment element
    function createCommentElement(comment) {

      const commentDiv = document.createElement('div');
      commentDiv.classList.add('flex-col', 'items-center', 'mb-4', 'pt-4', 'border-b', 'border-gray-300');
      
      // User profile and name
      const userContainer = document.createElement('div');
      userContainer.classList.add('flex', 'items-center', 'space-x-2');
      
      const userProfileImg = document.createElement('img');
      userProfileImg.classList.add('w-16', 'h-16', 'rounded-full', 'mr-4');
      userProfileImg.src = comment.user_profile_image_url;
      userProfileImg.alt = 'Profile Picture';
      
      const userName = document.createElement('h5');
      userName.classList.add('text-base', 'font-bold');
      userName.textContent =`${comment.first_name} ${comment.last_name}`;
      
      userContainer.appendChild(userProfileImg);
      userContainer.appendChild(userName);
      
      // Comment text
      const commentText = document.createElement('p');
      commentText.classList.add('text-sm', 'text-secondary', 'py-4');
      commentText.textContent = comment.comment_text;
      
      // Add userContainer, commentText to commentDiv
      commentDiv.appendChild(userContainer);
      commentDiv.appendChild(commentText);
      
      return commentDiv;
    }
  
    // Function to create a user post element
    function createPostElement(username, post) {
      const postDiv = document.createElement('div');
      postDiv.classList.add('flex-col', 'items-center', 'mb-4', 'pt-4');
      
      // Post content
      const postContentElement = document.createElement('p');
      postContentElement.classList.add('text-sm');

      const postImage = document.createElement('img');
      if (post.post_image_url) {
        postImage.classList.add('w-72', 'mb-2');
        postImage.src = post.post_image_url;
      
        // Append the image element only if the URL exists
        postDiv.appendChild(postImage);
      }


      const usernameElement = document.createElement('span');
      usernameElement.classList.add('font-bold', 'text-lg', 'pr-2'); 
      usernameElement.textContent = username;
      const spaceElement = document.createTextNode(' ');
  
      postContentElement.appendChild(usernameElement);
      postContentElement.appendChild(spaceElement);
      postContentElement.appendChild(document.createTextNode(post.content));
    
    
      postDiv.appendChild(postContentElement);


      const isLoggedIn = loggedUserId === userId;
      const editDeletePostBtn = document.getElementById("editDeletePostBtns");
      const deletePostBtn = document.getElementById("deletePostBtn");
      const editPostBtn = document.getElementById("editPostBtn");
  
      if (!isLoggedIn) {
          editDeletePostBtn.style.display = "none";
      }

      // Add an event listener to the "Delete" button
deletePostBtn.addEventListener("click", function () {
  const confirmDelete = confirm("Are you sure you want to delete this post?");

  if (confirmDelete) {
      
      axios.delete(`http://localhost:8005/users/deletePost/${userId}/${post.post_id}`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
        
      })
      .then((response)=>{
        console.log(response);
        // window.location.reload()
      })
      .catch((e)=>{
        console.log(e);
        console.error('Error deleting post:', error);
        alert("Error deleting post. Please try again later.");
      })
      .finally(()=>{
        // window.location.reload()
        window.location.href = './home.html'
      })
  }
});

editPostBtn.addEventListener("click", function () {
  // window.location.href = `../htmlFiles/editPost.html?postId=${postId}&content=${encodeURIComponent(postContentElement)}&postImage=${encodeURIComponent(postImage)}`;
  window.location.href = `../htmlFiles/editPost.html?postId=${postId}&content=${post.content}&userId=${userId}`;
});


      
      return postDiv;
    }
  
    // Fetch user profile, comments, and user posts concurrently
    Promise.all([
      fetchUserProfile(userId),
      fetchComments(),
      fetchCurrentPost(),
    ])
      .then(([userProfile, comments, currentPost]) => {
        // Update user profile information
        const userProfileImg = document.getElementById('userProfile');
        userProfileImg.src = userProfile.profile_image_url;
        userProfileImg.alt = 'Profile Picture';
  
        const userName = document.getElementById('userName');
        userName.textContent = `${userProfile.first_name} ${userProfile.last_name}`;
  
        const userUsername = document.getElementById('userUsername');
        userUsername.textContent = userProfile.username;

        //Display currentPost
        const postDiv = document.getElementById('postDiv');
        currentPost.forEach((post) => {
          const postElement = createPostElement(userProfile.username, post);
          // console.log(postElement)
          postDiv.appendChild(postElement);
        });
  
        // Display comments
        const commentSection = document.getElementById('commentSection');
        comments.forEach((comment) => {
          const commentElement = createCommentElement(comment);
          commentSection.appendChild(commentElement);
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  });
  
  