document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const passwordInput = document.getElementById('password');
    const rePasswordInput = document.getElementById('re-password');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const password = passwordInput.value;
        const rePassword = rePasswordInput.value;

        function showError(message) {
            errorMessage.textContent = message;
            errorMessage.style.color = 'red';
        }

        function showSuccess(message) {
            successMessage.textContent = message;
            successMessage.style.color = 'green';
        }

        function removeMessages() {
            errorMessage.textContent = '';
            successMessage.textContent = '';
        }

        function isValidPassword(password) {
            const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+.,=]).{8,}$/;
            return passwordPattern.test(password);
        }

        if (!password || !rePassword) {
            showError('Both password fields are required');
            return;
        }

        if (password !== rePassword) {
            showError("Passwords don't match");
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

        removeMessages();

        try {
            const response = await fetch('your_backend_endpoint_here', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: password,
                }),
            });

            const responseData = await response.json();

            if (response.status === 200) {
                showSuccess(responseData.message);
                setTimeout(() => {
                    window.location.href = '../index.html'; // Redirect to login page
                }, 3000); // 3 seconds
            } else {
                showError(responseData.message);
            }
        } catch (error) {
            showError('An error occurred. Please try again.');
        }
    });
});
