# KidEdu Backend API

A robust Express.js backend API for the KidEdu educational platform, designed to work seamlessly with Flutter frontend applications.

## Features

- **User Authentication**: JWT-based authentication with secure password hashing
- **MongoDB Integration**: Mongoose ODM for database operations
- **Input Validation**: Comprehensive request validation using express-validator
- **Security**: Helmet for security headers, rate limiting, and CORS support
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Environment Configuration**: Secure environment variable management

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Validation**: express-validator
- **Security**: Helmet, CORS, express-rate-limit

## Project Structure

```
kidedu-backend/
├── config/
│   ├── database.js          # MongoDB connection configuration
│   └── jwt.js               # JWT utility functions
├── controllers/
│   └── authController.js    # Authentication controller
├── middleware/
│   ├── auth.js              # JWT authentication middleware
│   ├── errorHandler.js      # Centralized error handling
│   └── validation.js        # Input validation rules
├── models/
│   └── User.js              # User model schema
├── routes/
│   └── auth.js              # Authentication routes
├── .env                     # Environment variables (not in repo)
├── .env.example             # Environment variables example
├── .gitignore               # Git ignore rules
├── package.json             # Project dependencies and scripts
├── server.js                # Application entry point
└── README.md                # Project documentation
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kidedu-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file with your configuration:
   ```env
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/kidedu
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start MongoDB**
   - For local MongoDB: `mongod`
   - For MongoDB Atlas: Ensure your connection string is correct in `.env`

5. **Run the application**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:3000` (or your configured PORT).

## API Endpoints

### Authentication Routes

All authentication routes are prefixed with `/api/auth`

#### POST /api/auth/signup
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

#### POST /api/auth/login
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

#### GET /api/auth/profile
Get current user profile (Protected Route).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### Health Check

#### GET /api/health
Check if the API is running.

**Response (200):**
```json
{
  "success": true,
  "message": "KidEdu Backend API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Authentication

This API uses JWT (JSON Web Tokens) for authentication. After successful login or signup, you'll receive a token that must be included in the Authorization header for protected routes:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

The API uses standardized error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Optional validation errors array
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (authentication required)
- `404`: Not Found
- `500`: Internal Server Error

## Security Features

- **Password Hashing**: Passwords are hashed using bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS**: Configured for cross-origin requests
- **Helmet**: Security headers for protection against common vulnerabilities
- **Input Validation**: Comprehensive request validation
- **Environment Variables**: Sensitive data stored in environment variables

## Flutter Integration

This backend is designed to work with Flutter applications. Key considerations:

1. **CORS**: Already configured to allow cross-origin requests
2. **JSON Responses**: All responses are in JSON format
3. **HTTP Status Codes**: Standard HTTP status codes for easy handling
4. **Token Authentication**: JWT tokens for stateless authentication

### Flutter HTTP Client Example

```dart
import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiService {
  static const String baseUrl = 'http://your-api-url.com/api';
  
  static Future<Map<String, dynamic>> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'email': email, 'password': password}),
    );
    
    return json.decode(response.body);
  }
  
  static Future<Map<String, dynamic>> getProfile(String token) async {
    final response = await http.get(
      Uri.parse('$baseUrl/auth/profile'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
    );
    
    return json.decode(response.body);
  }
}
```

## Development

### Available Scripts

- `npm start`: Start the server in production mode
- `npm run dev`: Start the server in development mode with auto-restart
- `npm test`: Run tests (placeholder)

### Adding New Routes

1. Create controller in `controllers/` directory
2. Add validation rules in `middleware/validation.js`
3. Create route file in `routes/` directory
4. Register route in `server.js`

### Database Schema Changes

1. Update model in `models/` directory
2. Add validation rules if needed
3. Update API documentation

## Deployment

### Environment Variables for Production

Ensure these environment variables are set in production:

```env
NODE_ENV=production
PORT=3000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_very_secure_jwt_secret
JWT_EXPIRE=7d
FRONTEND_URL=https://your-flutter-app-domain.com
```

### Production Considerations

1. Use a strong JWT secret (at least 32 characters)
2. Set up MongoDB with proper authentication
3. Configure HTTPS in production
4. Set up proper logging and monitoring
5. Use environment-specific configuration files
6. Implement proper backup strategies for MongoDB

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the KidEdu development team.

