document.addEventListener('DOMContentLoaded', function () {
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

// Function to fetch and display the list of followers for the specified user
function viewFollowers() {
    const user_id = getUserIdFromUrl();
    // const user_id = '06423759-615f-4155-a222-64a79cac4b04';

    axios.get(`/api/getFollowers?user_id=${user_id}`)
        .then(response => {
            const followersContainer = document.getElementById('followers-container');
            followersContainer.innerHTML = ''; // Clear the existing followers list

            // Loop through the followers data and display the users
            response.data.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.classList.add('flex', 'justify-between', 'mt-4');

                const userInfo = document.createElement('div');
                userInfo.classList.add('flex', 'items-center', 'mb-4', 'space-x-11');

                const profilePic = document.createElement('img');
                profilePic.classList.add('4', 'rounded-full', 'max-w-3xl', 'h-11');
                profilePic.src = user.profilePicUrl;
                profilePic.alt = 'Profile Picture';

                const username = document.createElement('span');
                username.classList.add('flex-col', 'pl-6');

                const nameLink = document.createElement('a');
                nameLink.href = `../htmlFiles/otherUserProfile.html?userId=${user.id}`;
                nameLink.textContent = user.fullName;

                const usernameLink = document.createElement('p');
                usernameLink.classList.add('text-sm', 'text-gray-500');
                usernameLink.textContent = user.username;

                username.appendChild(nameLink);
                username.appendChild(usernameLink);

                userInfo.appendChild(profilePic);
                userInfo.appendChild(username);

                userDiv.appendChild(userInfo);

                followersContainer.appendChild(userDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching followers: ', error);
        });
}

document.addEventListener('DOMContentLoaded', viewFollowers);

const backButton = document.getElementById('back-button');
backButton.addEventListener('click', function () {
  window.history.back();
})

})