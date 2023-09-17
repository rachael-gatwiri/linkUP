document.addEventListener('DOMContentLoaded', () => {
  // const addPostLink = document.getElementById('editProfileLink');
  const closeModal = document.getElementById('closeModal');
  const closeModalButton = document.getElementById('closeModalButton');
  const postModal = document.getElementById('postModal');
  const editProfileForm = document.getElementById('editProfileForm');
  const displayNameInput = document.getElementById('displayName');
  const profileImageInput = document.getElementById('fileInput');
  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');

  let postImageurl; 

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.color = 'red';
    errorMessage.style.display = 'block';
  }
  // addPostLink.addEventListener('click', () => {
  //   postModal.classList.remove('hidden');
  // });

  closeModal.addEventListener('click', () => {
    postModal.classList.add('hidden');
  });

  closeModalButton.addEventListener('click', () => {
    postModal.classList.add('hidden');
  });

  profileImageInput.addEventListener('change', async (e) => {
    const fileName = e.target.files[0]; // Access the first file in the array
    if (fileName) {
      const formData = new FormData();
      formData.append('file', fileName);
      formData.append('upload_preset', 'lfyho4ew');
      formData.append('cloud_name', 'LinkUp');

      try {
        const cloudinaryResponse = await fetch('https://api.cloudinary.com/v1_1/dykqrsfny/image/upload', {
          method: 'POST',
          body: formData,
        });

        if (cloudinaryResponse.ok) {
          const cloudinaryData = await cloudinaryResponse.json();
          postImageurl = cloudinaryData.url;
          console.log(postImageurl);
        } else {
          console.error('Failed to upload image to Cloudinary');
        }
      } catch (error) {
        console.error('Error uploading image to Cloudinary', error);
      }
    }
  });

  editProfileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log(postImageurl);

    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.log('User is not logged in');
      return;
    }
    const displayName = displayNameInput.value.trim();
    const [first_name, last_name] = displayName.split(' ');
    console.log(displayName);

    if (first_name && last_name) {
      axios
        .put(
          `http://localhost:8005/users/updateUserProfile/${userId}`,
          {
            first_name,
            last_name,
            profile_image_url: postImageurl,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          console.log(response);
          successMessage.textContent = 'Profile updated successfully';
          errorMessage.textContent = '';
          window.location.href = '/Client/htmlFiles/userProfile.html'; 
        })
        .catch((error) => {
          console.error(error);
          successMessage.textContent = '';
          errorMessage.textContent = 'An error occurred. Please try again.';
        });
    } else {
      showError('Please enter both first name and last name.');
    }
  });
});
