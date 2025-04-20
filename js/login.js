document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.auth-form');
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    form.insertBefore(errorMessage, form.firstChild);

    // Check if user just registered
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('registered') === 'true') {
        showMessage('Registration successful! Please login with your credentials.', 'success');
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        errorMessage.style.display = 'none';
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Basic validation
        if (!email || !password) {
            showError('Please fill in all fields');
            return;
        }

        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }

        try {
            // Disable submit button
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Logging in...';

            // Send login request
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Login successful
                window.location.href = '/dashboard.html';
            } else {
                // Show error message from server
                showError(data.message || 'Invalid email or password');
            }
        } catch (error) {
            showError('An error occurred. Please try again later.');
            console.error('Login error:', error);
        } finally {
            // Re-enable submit button
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = false;
            submitButton.textContent = 'Login';
        }
    });

    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Helper function to show error message
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        errorMessage.style.color = '#ff4444';
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Helper function to show success message
    function showMessage(message, type) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        errorMessage.style.color = type === 'success' ? '#00C851' : '#ff4444';
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}); 