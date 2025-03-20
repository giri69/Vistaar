const express = require('express');
const { 
  register, 
  login, 
  getCurrentUser,
  updatePassword
} = require('../controllers/authController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getCurrentUser);
router.put('/password', protect, updatePassword);

module.exports = router;