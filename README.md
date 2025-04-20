# Startup Funding Platform Backend

This is the backend server for the Startup Funding Platform, providing APIs for user authentication, program management, and application processing.

## Features

- User Authentication (Register, Login, Password Reset)
- Program Management (CRUD operations)
- Application Processing
- Admin Dashboard
- Email Notifications
- File Upload Support
- Security Features (Rate Limiting, XSS Protection, etc.)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/startup-fund
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=30d
   EMAIL_SERVICE=gmail
   EMAIL_USERNAME=your_email@gmail.com
   EMAIL_PASSWORD=your_email_password
   EMAIL_FROM=your_email@gmail.com
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- POST /api/auth/forgot-password - Request password reset
- POST /api/auth/reset-password - Reset password

### Programs
- GET /api/programs - Get all programs
- GET /api/programs/:id - Get program by ID
- POST /api/programs - Create new program (Admin only)
- PUT /api/programs/:id - Update program (Admin only)
- DELETE /api/programs/:id - Delete program (Admin only)

### Applications
- GET /api/applications - Get all applications (Admin only)
- GET /api/applications/user - Get user's applications
- POST /api/applications - Submit new application
- PUT /api/applications/:id - Update application status (Admin only)

### Users
- GET /api/users - Get all users (Admin only)
- GET /api/users/:id - Get user by ID
- PUT /api/users/:id - Update user profile
- DELETE /api/users/:id - Delete user (Admin only)

## Security Features

- JWT Authentication
- Password Hashing
- Rate Limiting
- XSS Protection
- MongoDB Query Sanitization
- HTTP Parameter Pollution Protection
- Helmet Security Headers

## Error Handling

The API uses a centralized error handling system with appropriate HTTP status codes and error messages.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 