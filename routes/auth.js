const express = require('express');
const router = express.Router();
const { signup, login, getProfile } = require('../controllers/authController');
const authenticate = require('../middleware/auth');
const { validateSignup, validateLogin } = require('../middleware/validation');

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', validateSignup, signup);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', validateLogin, login);

// @route   GET /api/auth/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', authenticate, getProfile);

module.exports = router;

