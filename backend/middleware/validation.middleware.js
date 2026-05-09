const { body, validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validateLogin = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  validateRequest
];

const validateRegister = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  // Make role optional on register; treat empty string or null as missing
  body('role').optional({ nullable: true, checkFalsy: true }).isIn(['ADMIN', 'HR', 'MANAGER', 'EMPLOYEE']).withMessage('Invalid role'),
  validateRequest
];

const validateEmployee = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('role').isIn(['ADMIN', 'HR', 'MANAGER', 'EMPLOYEE']).withMessage('Invalid role'),
  body('departmentId').optional().isInt().withMessage('Department ID must be an integer'),
  validateRequest
];

const validateOnboardingTask = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('dueDate').isISO8601().withMessage('Due date must be a valid date'),
  body('assignedTo').optional().isInt().withMessage('Assigned to must be an integer'),
  validateRequest
];

const validateAttendance = [
  body('employeeId').isInt().withMessage('Employee ID must be an integer'),
  body('date').isISO8601().withMessage('Date must be a valid date'),
  validateRequest
];

const validateLeaveRequest = [
  body('employeeId').isInt().withMessage('Employee ID must be an integer'),
  body('leaveType').isIn(['ANNUAL', 'SICK', 'MATERNITY', 'PATERNITY', 'UNPAID', 'BEREAVEMENT']).withMessage('Invalid leave type'),
  body('startDate').isISO8601().withMessage('Start date must be a valid date'),
  body('endDate').isISO8601().withMessage('End date must be a valid date'),
  body('totalDays').isDecimal().withMessage('Total days must be a decimal'),
  validateRequest
];

module.exports = {
  validateRequest,
  validateLogin,
  validateRegister,
  validateEmployee,
  validateOnboardingTask,
  validateAttendance,
  validateLeaveRequest
};