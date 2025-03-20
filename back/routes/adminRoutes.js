const express = require('express');
const {
  getAllStartups,
  getStartupDetails,
  reviewStartupApplication,
  getAllUsers,
  getUserDetails,
  getPlatformAnalytics,
  getPlatformStats
} = require('../controllers/adminController');
const { protect } = require('../middlewares/auth');
const { adminOnly } = require('../middlewares/role-middlewares');

const router = express.Router();

// All routes are protected and for admins only
router.use(protect, adminOnly);

// Startup management routes
router.get('/startups', getAllStartups);
router.get('/startups/:id', getStartupDetails);
router.put('/startups/:id/review', reviewStartupApplication);

// User management routes
router.get('/users', getAllUsers);
router.get('/users/:id', getUserDetails);

// Analytics routes
router.get('/analytics', getPlatformAnalytics);
router.get('/stats', getPlatformStats);

module.exports = router;