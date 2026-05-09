const { register, login, getProfile, updateProfile } = require('../services/auth.service');
const { validationResult } = require('express-validator');

const registerController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { user, token } = await register(req.body);
    
    // Remove password hash from response
    const { passwordHash, ...userWithoutPassword } = user;
    
    res.status(201).json({
      message: 'User registered successfully',
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const { user, token } = await login(email, password);
    
    // Remove password hash from response
    const { passwordHash, ...userWithoutPassword } = user;
    
    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const getProfileController = async (req, res) => {
  try {
    const user = await getProfile(req.user.id);
    
    // Remove password hash from response
    const { passwordHash, ...userWithoutPassword } = user;
    
    res.json({ user: userWithoutPassword });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const user = await updateProfile(req.user.id, req.body);
    
    // Remove password hash from response
    const { passwordHash, ...userWithoutPassword } = user;
    
    res.json({
      message: 'Profile updated successfully',
      user: userWithoutPassword
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registerController,
  loginController,
  getProfileController,
  updateProfileController
};