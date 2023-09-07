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
      const namesArray = names.split(' ');
      const firstName = namesArray[0];
      const lastName = namesArray.slice(1).join(' ');
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
    const response = await axios.post(
        'http://localhost:8005/users/register',
          {
            firstName: firstName, 
            lastName: lastName,   
            username: username,
            email: email,
            password: password
          }
     );          
if (response.status === 201) {
    const responseData = response.data;
    if (responseData.token) {
        // Save the token and user data locally
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('user', JSON.stringify(responseData.user));
    }
    // Registration successful, redirect to login page
    window.location.href = '../index.html';
}
else {
    if (response.data && response.data.error) {
        showError(response.data.error);
    } else {
        showError('An error occurred during registration');
    }
}
} catch (error) {
if (error.response && error.response.data && error.response.data.error) {
    showError(error.response.data.error);
} else {
    console.log(error.message);
}
}
});
});
