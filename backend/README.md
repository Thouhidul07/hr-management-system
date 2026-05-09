# HR Management System Backend

This is the backend API for the HR Management System built with Node.js, Express.js, Prisma ORM, and MySQL database.

## Features Implemented

1. **Authentication System**
   - User registration and login
   - JWT-based authentication
   - Role-based access control (Admin, HR, Manager, Employee)
   - Profile management

2. **Employee Management**
   - CRUD operations for employees
   - Employee search and filtering
   - Department management
   - Employee statistics

3. **Onboarding & Offboarding**
   - Create and manage onboarding tasks
   - Track task completion
   - Manage offboarding processes
   - Task assignment to employees

4. **Attendance & Time Tracking**
   - Clock in/out functionality
   - Attendance records management
   - Attendance reports and statistics
   - Status tracking (Present, Absent, Late, Half-day, Leave)

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **CORS**: enabled for cross-origin requests

## Project Structure

```
backend/
├── config/
│   ├── db.js          # Database configuration
│   └── jwt.js         # JWT configuration
├── controllers/
│   ├── auth.controller.js
│   ├── employee.controller.js
│   ├── onboarding.controller.js
│   └── attendance.controller.js
├── middleware/
│   ├── auth.middleware.js
│   └── validation.middleware.js
├── prisma/
│   ├── schema.prisma      # Prisma schema definition
│   └── seed.js            # Database seed data
├── routes/
│   ├── auth.routes.js
│   ├── employee.routes.js
│   ├── onboarding.routes.js
│   └── attendance.routes.js
├── services/
│   ├── auth.service.js
│   ├── employee.service.js
│   ├── onboarding.service.js
│   └── attendance.service.js
├── uploads/           # File uploads directory
├── .env               # Environment variables
├── .gitignore
├── package.json
└── server.js          # Main server file
```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file with your database credentials and other configurations.

4. Set up the database:
   ```bash
   # Create MySQL database
   mysql -u root -p -e "CREATE DATABASE hr_management_system;"
   
   # Generate Prisma client
   npm run prisma:generate
   
   # Run database migrations
   npm run prisma:migrate
   
   # Seed the database with initial data
   npm run prisma:seed
   ```

## Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. The server will start on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Employees
- `GET /api/employees` - Get all employees with pagination
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create new employee (HR/Admin only)
- `PUT /api/employees/:id` - Update employee (HR/Admin only)
- `DELETE /api/employees/:id` - Delete employee (HR/Admin only)
- `GET /api/employees/stats` - Get employee statistics

### Onboarding & Offboarding
- `GET /api/onboarding/tasks` - Get all onboarding tasks
- `GET /api/onboarding/tasks/:id` - Get task by ID
- `POST /api/onboarding/tasks` - Create new task (HR/Admin only)
- `PUT /api/onboarding/tasks/:id` - Update task (HR/Admin only)
- `DELETE /api/onboarding/tasks/:id` - Delete task (HR/Admin only)
- `GET /api/onboarding/tasks/employee/:employeeId` - Get tasks for employee
- `GET /api/onboarding/offboarding` - Get all offboarding processes
- `POST /api/onboarding/offboarding` - Create offboarding process (HR/Admin only)
- `PUT /api/onboarding/offboarding/:id` - Update offboarding process (HR/Admin only)
- `DELETE /api/onboarding/offboarding/:id` - Delete offboarding process (HR/Admin only)

### Attendance
- `GET /api/attendance` - Get all attendance records
- `GET /api/attendance/:id` - Get attendance record by ID
- `POST /api/attendance/clock-in` - Clock in
- `POST /api/attendance/clock-out` - Clock out
- `PUT /api/attendance/:id` - Update attendance record (HR/Admin only)
- `DELETE /api/attendance/:id` - Delete attendance record (HR/Admin only)
- `GET /api/attendance/report` - Get attendance report (Manager/HR/Admin only)
- `GET /api/attendance/stats` - Get attendance statistics

## Testing

1. Test the API endpoints using tools like Postman or curl:
   ```bash
   # Test health check
   curl http://localhost:3000/health
   
   # Test login
   curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email": "admin@hrms.com", "password": "password123"}'
   ```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment (development/production) | development |
| `DATABASE_URL` | MySQL database connection string | - |
| `JWT_SECRET` | JWT secret key | - |
| `JWT_EXPIRES_IN` | Token expiration time | 7d |
| `CORS_ORIGIN` | Frontend URL for CORS | http://localhost:3001 |

## Database Schema

The database schema includes the following main entities:
- Users (with roles)
- Departments
- Employees
- Onboarding Tasks
- Offboarding Processes
- Attendance Records

See `prisma/schema.prisma` for the complete schema definition.

## Security Features

- JWT-based authentication
- Role-based access control
- Password hashing with bcrypt
- Input validation
- CORS protection
- SQL injection prevention through Prisma ORM

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.