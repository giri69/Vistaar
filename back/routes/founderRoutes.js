const express = require('express');
const {
  getProfile,
  updateProfile,
  submitStartupApplication,
  addPitchMaterials,
  getStartups,
  getStartupById,
  updateStartup,
  getInterestedInvestors
} = require('../controllers/founderController');
const { protect } = require('../middlewares/auth');
const { founderOnly } = require('../middlewares/role-middlewares');

const router = express.Router();

// All routes are protected and for founders only
router.use(protect, founderOnly);

// Profile routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

// Startup routes
router.post('/startups/apply', submitStartupApplication);
router.post('/startups/:id/pitch-materials', addPitchMaterials);
router.get('/startups', getStartups);
router.get('/startups/:id', getStartupById);
router.put('/startups/:id', updateStartup);
router.get('/startups/:startupId/investors', getInterestedInvestors);

module.exports = router;