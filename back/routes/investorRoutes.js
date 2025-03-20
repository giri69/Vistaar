const express = require('express');
const {
  getProfile,
  updateProfile,
  getAvailableStartups,
  getStartupDetails,
  expressInterest,
  getInterestedStartups,
  getContributions
} = require('../controllers/investorController');
const { protect } = require('../middlewares/auth');
const { investorOnly } = require('../middlewares/role-middlewares');

const router = express.Router();

// All routes are protected and for investors only
router.use(protect, investorOnly);

// Profile routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

// Startup routes
router.get('/startups/available', getAvailableStartups);
router.get('/startups/:id', getStartupDetails);
router.post('/startups/:startupId/interest', expressInterest);
router.get('/startups/interested', getInterestedStartups);
router.get('/contributions', getContributions);

module.exports = router;