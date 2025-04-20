document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const errorMessage = document.getElementById('errorMessage');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordStrength = document.createElement('div');
    passwordStrength.className = 'password-strength';
    passwordInput.parentNode.appendChild(passwordStrength);

    // Password strength checker
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength++;
        
        // Contains number
        if (/\d/.test(password)) strength++;
        
        // Contains letter
        if (/[a-zA-Z]/.test(password)) strength++;
        
        // Contains special character
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

        // Update strength indicator
        passwordStrength.className = 'password-strength';
        if (strength <= 2) {
            passwordStrength.classList.add('strength-weak');
        } else if (strength === 3) {
            passwordStrength.classList.add('strength-medium');
        } else {
            passwordStrength.classList.add('strength-strong');
        }
    });

    // Form validation
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        errorMessage.style.display = 'none';
        
        // Basic validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const userType = document.getElementById('userType').value;
        const terms = document.getElementById('terms').checked;

        // Validate name
        if (name.length < 2) {
            showError('Please enter a valid name');
            return;
        }

        // Validate email
        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }

        // Validate password
        if (password.length < 8) {
            showError('Password must be at least 8 characters long');
            return;
        }

        // Check password strength
        if (passwordStrength.classList.contains('strength-weak')) {
            showError('Please choose a stronger password');
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            showError('Passwords do not match');
            return;
        }

        // Check terms acceptance
        if (!terms) {
            showError('Please accept the terms and conditions');
            return;
        }

        try {
            // Disable submit button
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Registering...';

            // Prepare form data
            const formData = {
                name,
                email,
                password,
                userType,
                newsletter: document.getElementById('newsletter').checked
            };

            // Send registration request
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // Registration successful
                window.location.href = '/login.html?registered=true';
            } else {
                // Show error message from server
                showError(data.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            showError('An error occurred. Please try again later.');
            console.error('Registration error:', error);
        } finally {
            // Re-enable submit button
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = false;
            submitButton.textContent = 'Register';
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
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}); 