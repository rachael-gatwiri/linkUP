document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const errorMessage = document.getElementById('errorMessage');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = emailInput.value;

        function showError(message) {
            errorMessage.textContent = message;
            errorMessage.style.color = 'red';
        }

        function showSuccess(message) {
            errorMessage.textContent = message;
            errorMessage.style.color = 'green';
        }

        function removeMessage() {
            errorMessage.textContent = '';
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

        removeMessage();

        try {
            const response = await fetch('your_backend_check_email_endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                }),
            });

            const responseData = await response.json();

            if (response.status === 200) {
                if (responseData.exists) {
                    // Email exists in the database, send reset password link
                    const resetResponse = await fetch('backend_reset_password_endpoint', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: email,
                        }),
                    });

                    const resetData = await resetResponse.json();

                    if (resetResponse.status === 200) {
                        showSuccess('Reset password email sent to ' + email);
                    } else {
                        showError(resetData.message);
                    }
                } else {
                    showError('Email does not exist');
                }
            } else {
                // Handle error messages returned from the backend
                showError(responseData.message);
            }
        } catch (error) {
            showError('An error occurred. Please try again.');
        }
    });
});
