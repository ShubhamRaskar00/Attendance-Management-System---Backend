# Attendance Management System - Backend

Node.js/Express.js backend for the Attendance Management System with MongoDB database.

## Technology Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Nodemailer for email services
- Express-validator for validation

## Prerequisites

- Node.js 16.x or higher
- MongoDB 4.x or higher
- npm 8.x or higher

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── middleware/     # Custom middleware
├── models/         # Database models
├── routes/         # API routes
├── services/       # Business logic
├── utils/          # Utility functions
└── templates/     # mail sending
```

## Installation

1. Clone the repository
```bash
git clone https://github.com/your-repo/attendance-system.git
cd attendance-system/backend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file in the root directory
```env
PORT=5000
MONGODB_URI=''
JWT_SECRET=''
NODE_ENV="development"
EMAIL=""
SMPT_SERVICE=gmail
SMPT_HOST=smtp.gmail.com
SMPT_PORT=465
SMPT_PASSWORD=""
SMPT_MAIL=""
SMTP_SECURE=true
```

4. Start the server
```bash
# Development
npm run dev / nodemon server.js

# Production
npm start
```

## Available Scripts

```bash
# Start production server
npm start

# Start development server
npm run dev

# Run tests
npm test

# Run ESLint
npm run lint

# Fix ESLint errors
npm run lint:fix
```

## API Endpoints

### Authentication
```
POST /v1/api/auth/login
POST /v1/api/auth/register
```

### Users
```
GET /v1/api/attendance/getuser/:id
```

### Attendance
```
POST /v1/api/attendance/checkin
PATCH /v1/api/attendance/checkout/:id
GET /v1/api/attendance/getattendence/:id
```

### Admin
```
GET /v1/api/admin/attendance
PATCH /v1/api/admin/attendance/:id
```

### Report
```
POST /v1/api/report/generate
```

## Middleware

- `auth.js` - JWT authentication
- `admin.js` - Admin role controle
- `databaseErrorHandler.js` - Database validation

## Database Models

- `User.model.js` - User schema and methods
- `Attendance.model.js` - Attendance records

## Email Templates

Located in `src/templates/emails/`
- Welcome email
- Password reset
- Attendance notifications
- Daily reports


## Configuration

### MongoDB
- Connection management in `src/config/database.js`
- Mongoose configuration and options


```

## Security Measures

- CORS configuration
- Rate limiting
- Request validation
- JWT token management
- Password hashing
- Security headers

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.