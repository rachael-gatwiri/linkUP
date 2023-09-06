document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

    console.log(successMessage);

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = emailInput.value;

       // Checking the error message
       function showError(message) {
        errorMessage.textContent = message;
        successMessage.textContent = '';
    }
   

    // Removing the error message
    function removeError() {
        errorMessage.textContent = '';
        successMessage.textContent = '';
    }
        function isValidEmail(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email);
        }

        if (!email) {
            showError('Email field is required');
            return;
        }

        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            return;
        } 

        removeError();

        try {
            const response = await axios.post(
                'http://localhost:8005/users/forgotPassword',
                {
                    email: email
                }
            );

            if (response.status === 200) {
                successMessage.textContent = response.data.message;
                
            } else {
                if (response.data && response.data.error) {
                    showError(response.data.error);
                } else {
                    showError('An error occurred. Please try again later.');
                }
            }
        } catch (error) {
            if ( error.response.data.error  ||  error.response.data || error.response ) {
                showError(error.response.data.error);
            } else {
                console.error(error);
            }
        }
    });
});
