const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/auth.middleware');
const { validateOnboardingTask } = require('../middleware/validation.middleware');
const { 
  getAllOnboardingTasksController, 
  getOnboardingTaskByIdController, 
  createOnboardingTaskController, 
  updateOnboardingTaskController, 
  deleteOnboardingTaskController, 
  getOnboardingTasksByEmployeeController,
  getOnboardingStatsController,
  getAllOffboardingProcessesController,
  getOffboardingProcessByIdController,
  createOffboardingProcessController,
  updateOffboardingProcessController,
  deleteOffboardingProcessController
} = require('../controllers/onboarding.controller');

// All routes require authentication
router.use(authenticate);

// Onboarding Tasks routes
router.get('/tasks', getAllOnboardingTasksController);
router.get('/tasks/stats', getOnboardingStatsController);
router.get('/tasks/employee/:employeeId', getOnboardingTasksByEmployeeController);
router.get('/tasks/:id', getOnboardingTaskByIdController);
router.post('/tasks', authorize(['HR', 'ADMIN']), validateOnboardingTask, createOnboardingTaskController);
router.put('/tasks/:id', authorize(['HR', 'ADMIN']), updateOnboardingTaskController);
router.delete('/tasks/:id', authorize(['HR', 'ADMIN']), deleteOnboardingTaskController);

// Offboarding Processes routes
router.get('/offboarding', getAllOffboardingProcessesController);
router.get('/offboarding/:id', getOffboardingProcessByIdController);
router.post('/offboarding', authorize(['HR', 'ADMIN']), createOffboardingProcessController);
router.put('/offboarding/:id', authorize(['HR', 'ADMIN']), updateOffboardingProcessController);
router.delete('/offboarding/:id', authorize(['HR', 'ADMIN']), deleteOffboardingProcessController);

module.exports = router;