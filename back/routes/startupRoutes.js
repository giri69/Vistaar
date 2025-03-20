const express = require('express');
const {
  handlePaperwork,
  getDocumentById,
  reviewDocument,
  acceptInvestorOffer,
  rejectInvestorOffer,
  getStartupDocuments
} = require('../controllers/startupController');
const { protect } = require('../middlewares/auth');
const { adminOnly, founderOrAdmin } = require('../middlewares/role-middlewares');

const router = express.Router();

// All routes are protected
router.use(protect);

// Document routes
router.post('/:id/documents', founderOrAdmin, handlePaperwork);
router.get('/:id/documents', protect, getStartupDocuments);
router.get('/documents/:documentId', protect, getDocumentById);
router.put('/documents/:documentId/review', adminOnly, reviewDocument);

// Investor offer routes
router.put('/:startupId/investors/:investorId/accept', acceptInvestorOffer);
router.put('/:startupId/investors/:investorId/reject', rejectInvestorOffer);

module.exports = router;