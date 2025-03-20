const express = require('express');
const {
  getProfile,
  updateProfile,
  getAvailableStartups,
  expressInterest,
  getInterestedStartups,
  getInvestments
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
router.post('/startups/:startupId/interest', expressInterest);
router.get('/startups/interested', getInterestedStartups);
router.get('/investments', getInvestments);

module.exports = router;