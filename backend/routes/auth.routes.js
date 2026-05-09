const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/auth.middleware');
const { validateLogin, validateRegister } = require('../middleware/validation.middleware');
const { registerController, loginController, getProfileController, updateProfileController } = require('../controllers/auth.controller');

// Public routes
router.post('/register', validateRegister, registerController);
router.post('/login', validateLogin, loginController);

// Protected routes
router.get('/profile', authenticate, getProfileController);
router.put('/profile', authenticate, updateProfileController);

module.exports = router;