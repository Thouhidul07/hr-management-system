const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/auth.middleware');
const { validateAttendance } = require('../middleware/validation.middleware');
const { 
  getAllAttendanceRecordsController, 
  getAttendanceByIdController, 
  clockInController, 
  clockOutController, 
  updateAttendanceController, 
  deleteAttendanceController, 
  getAttendanceReportController,
  getAttendanceStatsController
} = require('../controllers/attendance.controller');

// All routes require authentication
router.use(authenticate);

// Public routes (accessible by all authenticated users)
router.get('/', getAllAttendanceRecordsController);
router.get('/stats', getAttendanceStatsController);

// Employee clock in/out routes
router.post('/clock-in', authenticate, clockInController);
router.post('/clock-out', authenticate, clockOutController);

// Manager and Admin routes
router.get('/report', authorize(['MANAGER', 'ADMIN', 'HR']), getAttendanceReportController);

// HR and Admin routes
router.get('/:id', authorize(['HR', 'ADMIN']), getAttendanceByIdController);
router.put('/:id', authorize(['HR', 'ADMIN']), updateAttendanceController);
router.delete('/:id', authorize(['HR', 'ADMIN']), deleteAttendanceController);

module.exports = router;