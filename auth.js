// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function() {
        const input = this.previousElementSibling;
        if (input.type === 'password') {
            input.type = 'text';
            this.classList.remove('fa-eye');
            this.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            this.classList.remove('fa-eye-slash');
            this.classList.add('fa-eye');
        }
    });
});

// Form validation and submission
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userType = document.getElementById('userType').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Basic validation
        if (!userType || !username || !password) {
            showError('Please fill in all fields');
            return;
        }

        // Here you would typically make an API call to your backend
        // For now, we'll simulate a successful login
        const userData = {
            userType,
            username,
            password
        };

        // Store user data in localStorage (for demo purposes only)
        localStorage.setItem('currentUser', JSON.stringify(userData));

        // Redirect to main page
        window.location.href = 'index.html';
    });
}

if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userType = document.getElementById('userType').value;
        const fullName = document.getElementById('fullName').value;
        const username = document.getElementById('username').value;
        const address = document.getElementById('address').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Basic validation
        if (!userType || !fullName || !username || !address || !password || !confirmPassword) {
            showError('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            showError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            showError('Password must be at least 6 characters long');
            return;
        }

        // Here you would typically make an API call to your backend
        // For now, we'll simulate a successful registration
        const userData = {
            userType,
            fullName,
            username,
            address,
            password
        };

        // Store user data in localStorage (for demo purposes only)
        localStorage.setItem('registeredUsers', JSON.stringify([
            ...(JSON.parse(localStorage.getItem('registeredUsers')) || []),
            userData
        ]));

        // Redirect to login page
        alert('Registration successful! Please login.');
        window.location.href = 'login.html';
    });
}

function showError(message) {
    // Remove any existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Create and show new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.display = 'block';
    errorDiv.textContent = message;

    const form = document.querySelector('.auth-form');
    form.insertBefore(errorDiv, form.firstChild);

    // Add shake animation to form
    form.classList.add('shake');
    setTimeout(() => form.classList.remove('shake'), 500);
}
