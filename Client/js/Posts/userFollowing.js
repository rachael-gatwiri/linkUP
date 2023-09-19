document.addEventListener('DOMContentLoaded', () => {
    let userId = localStorage.getItem('userId');

    // User Profile Sidebar
const userProfileImg = document.getElementById('userProfileImg');
const userProfileName = document.getElementById('userProfileName');
const userProfileUsername = document.getElementById('userProfileusername');

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


// Function to parse the URL and get the userId parameter
function getUserIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('user_id');
}

let user_id = getUserIdFromUrl();
const apiUserProfile = `http://localhost:8005/users/getUserProfile/${user_id}`;
axios.get(apiUserProfile)
  .then(Response => {
    const userProfile = Response.data;
    const profileImage = document.getElementById('profile-image');
    profileImage.src = userProfile ? userProfile.profile_image_url : '';
    profileImage.alt = 'Profile Picture';
    const userName = document.getElementById('user-name');
    const userUsername = document.getElementById('user-username');
    userName.textContent = userProfile ? `${userProfile.first_name} ${userProfile.last_name}` : '';
    userUsername.textContent = userProfile ? userProfile.username : '';
  })
  .catch(error => {
    console.error('Error fetching user profile:', error);
  });


const backButton = document.getElementById('back-button');
backButton.addEventListener('click', function () {
  window.history.back();

});


function fetchFollowingUserProfile(user_id) {
  const apiUserProfile = `http://localhost:8005/users/getUserProfile/${user_id}`;
  return fetch(apiUserProfile)
  .then(Response => {
    const userProfile = Response.data;
  })
    .catch((error) => {
      console.error('Error fetching user profile:', error);
      return {};
    });
}

// Function to fetch and display the users the current user is following
function viewFollowing() {
  const user_id = getUserIdFromUrl();

  const apiUrlIsFollowing = `http://localhost:8005/users/getFollowing/${user_id}`;
  axios.get(apiUrlIsFollowing)
      .then(response => {
          const followingContainer = document.getElementById('following-container');
          followingContainer.innerHTML = ''; 
          followingContainer.classList.add('flex', 'flex-col', 'space-y-4');

          // Loop through the following data and display the users
          response.data.forEach(user => {
            console.log(user);
            const userDiv = document.createElement('div');
            userDiv.classList.add('flex-col', 'items-center', 'mb-4', 'pt-4', 'border-b', 'border-gray-300');

            const userContainer = document.createElement('div');
            userContainer.classList.add('flex', 'items-center', 'space-x-2');

            const userProfileImg = document.createElement('img');
            userProfileImg.classList.add('w-16', 'h-16', 'rounded-full', 'mr-4');
            userProfileImg.src = user.profile_image_url;
            userProfileImg.alt = 'Profile Picture';

            const userName = document.createElement('h5');
            userName.classList.add('text-lg', 'font-bold');
            userName.textContent =`${user.first_name} ${user.last_name}`;
            
            userContainer.appendChild(userProfileImg);
            userContainer.appendChild(userName);
            userDiv.appendChild(userContainer);
            followingContainer.appendChild(userDiv);
            

          });
      })
      .catch(error => {
          console.error('Error fetching following: ', error);
      });
}

viewFollowing();


});