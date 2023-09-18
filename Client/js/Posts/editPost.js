// Function to parse query parameters from the URL
function getParameterValue(parameterName) {
  const queryString = window.location.search;
  const parameters = new URLSearchParams(queryString);
  return parameters.get(parameterName);
}

document.addEventListener('DOMContentLoaded', function() {

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
  
  const postId = getParameterValue("postId");
  const postContentElement = getParameterValue("content");
  const postImageElement = getParameterValue("postImage");
  const userId = getParameterValue("userId");

  // Fetch the post content and set it as editable
  const postContent = document.getElementById("postContent");
  postContent.textContent = postContentElement;
  postContent.contentEditable = true; 

  document.querySelector('#editPostForm').addEventListener('submit', (e)=>{
    e.preventDefault()
    const content = document.querySelector('#postContent').value
    axios.put(`http://localhost:8005/users/editPost/${postId}`, 
    {
      userId,
      content,
      postImage: ''
    }, 
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response)=>{
      window.location.href = './home.html'
      console.log(response);
    })
    .catch((e)=>{
      console.log(e);
        console.error('Error deleting post:', error);
        alert("Error updating post. Please try again later.");
    })
  })

});

document.getElementById("closeModalButton").addEventListener("click", function() {
  window.location.href = "./userComment.html";
});

