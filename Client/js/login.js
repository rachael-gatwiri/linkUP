document.addEventListener('DOMContentLoaded', async function () {
  const form = document.querySelector('form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const errorMessage = document.getElementById('errorMessage');

  form.addEventListener('submit', async function (event) {
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
      const response = await axios.post(
        'http://localhost:8005/users/login',
        {
          email,
          password
        }
      );

      if (response.status === 200) {
        const responseData = response.data; // Corrected line
        const userId = responseData.user.id;
        localStorage.setItem('userId', userId);

        window.location.href = '/Client/htmlFiles/home.html';
      } else (response.status === 400) 
        showError(response.data.error); // Display the server error message
    } catch (error) {
      showError(error.response.data.error); // Display the server error message
    
    }
  });
});
