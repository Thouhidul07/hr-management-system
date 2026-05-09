const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth.routes');
const employeeRoutes = require('./routes/employee.routes');
const onboardingRoutes = require('./routes/onboarding.routes');
const attendanceRoutes = require('./routes/attendance.routes');

// Import database connection
const { testConnection } = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'HR Management System API is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/onboarding', onboardingRoutes);
app.use('/api/attendance', attendanceRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to HR Management System API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      employees: '/api/employees',
      onboarding: '/api/onboarding',
      attendance: '/api/attendance'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Error:', error);
  
  // Prisma errors
  if (error.code === 'P2002') {
    return res.status(400).json({
      error: 'Duplicate entry',
      message: 'A record with this value already exists'
    });
  }
  
  // Default error response
  res.status(error.status || 500).json({
    error: error.message || 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

// Start server
const startServer = async () => {
  try {
    // Test database connection
    await testConnection();
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`Database connected successfully`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

startServer();