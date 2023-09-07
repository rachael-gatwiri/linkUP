document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');
  
    form.addEventListener('submit', async function(event) {
      event.preventDefault();
  
      const email = emailInput.value;
      const password = passwordInput.value;
  
      function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.color = 'red';
      }
  
      function removeError() {
        errorMessage.textContent = '';
      }
  
      function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
      }
  
      if (!email || !password) {
        showError('All fields are required');
        return;
      }
  
      if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
      }
  
      removeError();
  
      try {
        const response = await fetch(
          'http://localhost:8005/users/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
              password: password
            })
          }
        );
  
        const responseData = await response.json();
  
        if (response.status === 200) {
          window.location.href = '/Client/htmlFiles/home.html';
        } else {
          if (responseData.error) {
            showError(responseData.error);
          } else {
            showError('Invalid credentials');
          }
        }
      } catch (error) {
        showError('An error occurred. Please try again.');
      }
    });
  });
  