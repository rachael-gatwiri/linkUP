document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const passwordInput = document.getElementById('password');
    const rePasswordInput = document.getElementById('re-password');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const token = window.location.search.split('=')[1];
        const newPassword = passwordInput.value;
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

        function isValidPassword(newPassword) {
            const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+.,=]).{8,}$/;
            return passwordPattern.test(newPassword);
        }

        if (!newPassword || !rePassword) {
            showError('Both password fields are required');
            return;
        }

        if (newPassword !== rePassword) {
            showError("Passwords don't match");
            return;
        }

        if (!isValidPassword(newPassword)) {
            let errorMessage = 'Password must contain:';

            if (!/(?=.*[a-z])/.test(newPassword)) {
                errorMessage += ' lowercase letter,';
            }

            if (!/(?=.*[A-Z])/.test(newPassword)) {
                errorMessage += ' capital letter,';
            }

            if (!/(?=.*\d)/.test(newPassword)) {
                errorMessage += ' number,';
            }

            if (!/(?=.*[@#$%^&+=.,])/.test(newPassword)) {
                errorMessage += ' special character (@#$%^&+.,=),';
            }

            if (newPassword.length < 8) {
                errorMessage += ' at least 8 characters,';
            }

            errorMessage = errorMessage.replace(/,$/, '');
            showError(errorMessage);
            return;
        }

        removeMessages();

        try {
            const response = await fetch(`http://localhost:8005/users/resetPassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    token,
                    newPassword
                })
            });
    
            const data = await response.json();
    
            if (response.ok) {
                // Password reset successful
                // Redirect the user to the login page or show a success message
                window.location.href = '/Client/index.html';
            } else {
                showError(data.error || 'Password reset failed');
            }
        } catch (error) {
            console.log(error.message);
            // showError('An error occurred during password reset');
        }
    });
});
