document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const submit = document.getElementById('editProfileSaveBtn');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
  
    form.addEventListener('submit', async function(event) {
      event.preventDefault();
  
      const firstName = 'Fetch this value from your backend'; 
      const lastName = 'Fetch this value from your backend'; 
  
      const displayName = `${firstName} ${lastName}`;
  
      function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.color = 'red';
      }
  
      function showSuccess(message, durationInSeconds) {
        successMessage.textContent = message;
        successMessage.style.color = 'green';
  
      
        setTimeout(() => {
          successMessage.textContent = '';
        }, durationInSeconds * 1000); 
      }
  
      removeError();
  
      try {
        // Make an API request to save the display name
        const response = await fetch('http://localhost:8005/users//updateUserProfile/:userId', {
          method: 'POST',
          body: JSON.stringify({ displayName }), // Send the display name to the backend
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.status === 200) {
          // Display name saved successfully
          showSuccess('Profile updated successfully', 4); // Show success message for 4 seconds
        } else {
          // Handle error response
          const responseData = await response.json();
          if (responseData.error) {
            showError(responseData.error);
          } else {
            showError('An error occurred while updating your profile');
          }
        }
      } catch (error) {
        showError('An error occurred. Please try again.');
      }
    });
  });
  