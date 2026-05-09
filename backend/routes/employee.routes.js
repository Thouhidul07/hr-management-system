const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/auth.middleware');
const { validateEmployee } = require('../middleware/validation.middleware');
const { 
  getAllEmployeesController, 
  getEmployeeByIdController, 
  createEmployeeController, 
  updateEmployeeController, 
  deleteEmployeeController, 
  getEmployeeStatsController 
} = require('../controllers/employee.controller');

// All routes require authentication
router.use(authenticate);

// Public routes (accessible by all authenticated users)
router.get('/', getAllEmployeesController);
router.get('/stats', getEmployeeStatsController);

// HR and Admin routes
router.post('/', authorize(['HR', 'ADMIN']), validateEmployee, createEmployeeController);
router.put('/:id', authorize(['HR', 'ADMIN']), validateEmployee, updateEmployeeController);
router.delete('/:id', authorize(['HR', 'ADMIN']), deleteEmployeeController);

// Manager and Admin routes
router.get('/:id', authorize(['MANAGER', 'ADMIN', 'HR']), getEmployeeByIdController);

module.exports = router;