const getApiDocs = (req, res) => {
  res.json({
    api: {
      name: 'HR Management System API',
      version: '1.0.0',
      baseUrl: '/api',
      docsUrl: '/api/docs',
      description: 'Comprehensive API documentation for authentication, employee management, onboarding, and attendance features.',
      authentication: {
        type: 'Bearer Token',
        header: 'Authorization: Bearer <token>'
      }
    },
    endpoints: [
      {
        path: '/health',
        method: 'GET',
        summary: 'Health check for the API server',
        auth: 'None',
        response: {
          200: {
            status: 'OK',
            message: 'HR Management System API is running',
            timestamp: '2026-05-10T00:00:00.000Z'
          }
        }
      },
      {
        path: '/',
        method: 'GET',
        summary: 'Root welcome endpoint',
        auth: 'None',
        response: {
          200: {
            message: 'Welcome to HR Management System API',
            version: '1.0.0',
            endpoints: {
              auth: '/api/auth',
              employees: '/api/employees',
              onboarding: '/api/onboarding',
              attendance: '/api/attendance',
              docs: '/api/docs'
            }
          }
        }
      },
      {
        path: '/api/auth/register',
        method: 'POST',
        summary: 'Register a new user',
        auth: 'None',
        request: {
          body: {
            firstName: 'string',
            lastName: 'string',
            email: 'string (email)',
            password: 'string (min 6 chars)',
            role: 'ADMIN | HR | MANAGER | EMPLOYEE'
          }
        },
        response: {
          201: {
            message: 'User registered successfully',
            user: {
              id: 'integer',
              firstName: 'string',
              lastName: 'string',
              email: 'string',
              role: 'string',
              createdAt: 'datetime',
              updatedAt: 'datetime'
            },
            token: 'string'
          },
          400: {
            errors: ['validation error details']
          }
        }
      },
      {
        path: '/api/auth/login',
        method: 'POST',
        summary: 'Login and receive an authentication token',
        auth: 'None',
        request: {
          body: {
            email: 'string (email)',
            password: 'string'
          }
        },
        response: {
          200: {
            message: 'Login successful',
            user: {
              id: 'integer',
              firstName: 'string',
              lastName: 'string',
              email: 'string',
              role: 'string'
            },
            token: 'string'
          },
          401: {
            error: 'Invalid credentials'
          }
        }
      },
      {
        path: '/api/auth/profile',
        method: 'GET',
        summary: 'Get the authenticated user profile',
        auth: 'Bearer token required',
        response: {
          200: {
            user: {
              id: 'integer',
              firstName: 'string',
              lastName: 'string',
              email: 'string',
              role: 'string'
            }
          },
          401: {
            error: 'Authentication required'
          }
        }
      },
      {
        path: '/api/auth/profile',
        method: 'PUT',
        summary: 'Update authenticated user profile',
        auth: 'Bearer token required',
        request: {
          body: {
            firstName: 'string (optional)',
            lastName: 'string (optional)',
            email: 'string (optional email)'
          }
        },
        response: {
          200: {
            message: 'Profile updated successfully',
            user: {
              id: 'integer',
              firstName: 'string',
              lastName: 'string',
              email: 'string',
              role: 'string'
            }
          }
        }
      },
      {
        path: '/api/employees',
        method: 'GET',
        summary: 'List all employees',
        auth: 'Bearer token required',
        response: {
          200: ['array of employee objects']
        }
      },
      {
        path: '/api/employees/stats',
        method: 'GET',
        summary: 'Get employee statistics',
        auth: 'Bearer token required',
        response: {
          200: {
            totalEmployees: 'integer',
            roles: 'object',
            departments: 'object'
          }
        }
      },
      {
        path: '/api/employees',
        method: 'POST',
        summary: 'Create a new employee record',
        auth: 'Bearer token required (HR, ADMIN)',
        request: {
          body: {
            firstName: 'string',
            lastName: 'string',
            email: 'string (email)',
            role: 'ADMIN | HR | MANAGER | EMPLOYEE',
            departmentId: 'integer (optional)'
          }
        }
      },
      {
        path: '/api/employees/:id',
        method: 'GET',
        summary: 'Get an employee by ID',
        auth: 'Bearer token required (MANAGER, ADMIN, HR)',
        response: {
          200: 'employee object'
        }
      },
      {
        path: '/api/employees/:id',
        method: 'PUT',
        summary: 'Update an employee record',
        auth: 'Bearer token required (HR, ADMIN)',
        request: {
          body: {
            firstName: 'string',
            lastName: 'string',
            email: 'string (email)',
            role: 'ADMIN | HR | MANAGER | EMPLOYEE',
            departmentId: 'integer (optional)'
          }
        }
      },
      {
        path: '/api/employees/:id',
        method: 'DELETE',
        summary: 'Delete an employee record',
        auth: 'Bearer token required (HR, ADMIN)'
      },
      {
        path: '/api/onboarding/tasks',
        method: 'GET',
        summary: 'List all onboarding tasks',
        auth: 'Bearer token required'
      },
      {
        path: '/api/onboarding/tasks/stats',
        method: 'GET',
        summary: 'Get onboarding task statistics',
        auth: 'Bearer token required'
      },
      {
        path: '/api/onboarding/tasks/employee/:employeeId',
        method: 'GET',
        summary: 'List onboarding tasks for a specific employee',
        auth: 'Bearer token required'
      },
      {
        path: '/api/onboarding/tasks/:id',
        method: 'GET',
        summary: 'Get a specific onboarding task by ID',
        auth: 'Bearer token required'
      },
      {
        path: '/api/onboarding/tasks',
        method: 'POST',
        summary: 'Create an onboarding task',
        auth: 'Bearer token required (HR, ADMIN)',
        request: {
          body: {
            title: 'string',
            description: 'string',
            dueDate: 'ISO 8601 date string',
            assignedTo: 'integer (optional)'
          }
        }
      },
      {
        path: '/api/onboarding/tasks/:id',
        method: 'PUT',
        summary: 'Update an onboarding task',
        auth: 'Bearer token required (HR, ADMIN)'
      },
      {
        path: '/api/onboarding/tasks/:id',
        method: 'DELETE',
        summary: 'Delete an onboarding task',
        auth: 'Bearer token required (HR, ADMIN)'
      },
      {
        path: '/api/onboarding/offboarding',
        method: 'GET',
        summary: 'List all offboarding processes',
        auth: 'Bearer token required'
      },
      {
        path: '/api/onboarding/offboarding/:id',
        method: 'GET',
        summary: 'Get a specific offboarding process by ID',
        auth: 'Bearer token required'
      },
      {
        path: '/api/onboarding/offboarding',
        method: 'POST',
        summary: 'Create an offboarding process',
        auth: 'Bearer token required (HR, ADMIN)'
      },
      {
        path: '/api/onboarding/offboarding/:id',
        method: 'PUT',
        summary: 'Update an offboarding process',
        auth: 'Bearer token required (HR, ADMIN)'
      },
      {
        path: '/api/onboarding/offboarding/:id',
        method: 'DELETE',
        summary: 'Delete an offboarding process',
        auth: 'Bearer token required (HR, ADMIN)'
      },
      {
        path: '/api/attendance',
        method: 'GET',
        summary: 'List all attendance records',
        auth: 'Bearer token required'
      },
      {
        path: '/api/attendance/stats',
        method: 'GET',
        summary: 'Get attendance statistics',
        auth: 'Bearer token required'
      },
      {
        path: '/api/attendance/clock-in',
        method: 'POST',
        summary: 'Record employee clock-in',
        auth: 'Bearer token required',
        request: {
          body: {
            employeeId: 'integer',
            date: 'ISO 8601 date string'
          }
        }
      },
      {
        path: '/api/attendance/clock-out',
        method: 'POST',
        summary: 'Record employee clock-out',
        auth: 'Bearer token required',
        request: {
          body: {
            employeeId: 'integer',
            date: 'ISO 8601 date string'
          }
        }
      },
      {
        path: '/api/attendance/report',
        method: 'GET',
        summary: 'Get attendance report for managers and admins',
        auth: 'Bearer token required (MANAGER, ADMIN, HR)'
      },
      {
        path: '/api/attendance/:id',
        method: 'GET',
        summary: 'Get a single attendance record by ID',
        auth: 'Bearer token required (HR, ADMIN)'
      },
      {
        path: '/api/attendance/:id',
        method: 'PUT',
        summary: 'Update an attendance record',
        auth: 'Bearer token required (HR, ADMIN)' 
      },
      {
        path: '/api/attendance/:id',
        method: 'DELETE',
        summary: 'Delete an attendance record',
        auth: 'Bearer token required (HR, ADMIN)'
      }
    ]
  });
};

module.exports = {
  getApiDocs
};
