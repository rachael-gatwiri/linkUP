document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const namesInput= document.getElementById('name');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');
  
    form.addEventListener('submit', async function(event) {
      event.preventDefault();
  
      const names = namesInput.value;
      const username = usernameInput.value;
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
  
      function isValidPassword(password) {
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+.,=]).{8,}$/;
        return passwordPattern.test(password);
      }
  
      if (!names || !username || !email || !password) {
        showError('All fields are required');
        return;
      }
      const namesArray = names.split(' ');
      if (namesArray.length < 2) {
          showError('Please enter at least two names');
          return;
      }
  
      if (username.length < 4) {
        showError('Username must be at least 4 characters');
        return;
      }
  
      if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
      }
  
      if (!isValidPassword(password)) {
        let errorMessage = 'Password must contain:';
        
        if (!/(?=.*[a-z])/.test(password)) {
          errorMessage += ' lowercase letter,';
        }
        
        if (!/(?=.*[A-Z])/.test(password)) {
          errorMessage += ' capital letter,';
        }
        
        if (!/(?=.*\d)/.test(password)) {
          errorMessage += ' number,';
        }
        
        if (!/(?=.*[@#$%^&+=.,])/.test(password)) {
          errorMessage += ' special character (@#$%^&+.,=),';
        }
        
        if (password.length < 8) {
          errorMessage += ' at least 8 characters,';
        }
        
        errorMessage = errorMessage.replace(/,$/, '');
        showError(errorMessage);
        return;
      }
  
      removeError();
  
      try {
        const response = await fetch('your_backend_endpoint_here', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: firstName,
            username: username,
            email: email,
            password: password,
          }),
        });
  
        const responseData = await response.json();
  
        if (response.status === 200) {
          window.location.href = '../index.html';
        } else {
          // Handle error messages returned from the backend
          showError(responseData.message);
        }
      } catch (error) {
        showError('An error occurred. Please try again.');
      }
    });
  });
  