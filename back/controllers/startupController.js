const { ObjectId } = require('mongodb');
const { getDB } = require('../config/db');
const { asyncHandler } = require('../utils/errorHandler');
const { success, error } = require('../utils/responseHandler');

// Handle paperwork for a startup
const handlePaperwork = asyncHandler(async (req, res) => {
  const db = getDB();
  const startupId = req.params.id;
  const { documentType, documentTitle, documentUrl, description } = req.body;
  
  // Validate input
  if (!documentType || !documentTitle || !documentUrl) {
    return error(res, 'Please provide document type, title and URL', 400);
  }
  
  // Check if startup exists
  const startup = await db.collection('startups').findOne({
    _id: new ObjectId(startupId)
  });
  
  if (!startup) {
    return error(res, 'Startup not found', 404);
  }
  
  // Check if user is the founder or admin
  if (req.user.role !== 'admin' && 
      startup.founderId.toString() !== req.user.id) {
    return error(res, 'Not authorized to handle paperwork for this startup', 403);
  }
  
  // Create document record
  const document = {
    startupId: new ObjectId(startupId),
    documentType,
    documentTitle,
    documentUrl,
    description: description || '',
    createdBy: new ObjectId(req.user.id),
    createdAt: new Date(),
    status: req.user.role === 'admin' ? 'approved' : 'pending' // Admin uploads are auto-approved
  };
  
  const result = await db.collection('documents').insertOne(document);
  
  // Update startup's documents array
  await db.collection('startups').updateOne(
    { _id: new ObjectId(startupId) },
    { 
      $push: { 
        documents: {
          documentId: result.insertedId,
          documentType,
          documentTitle,
          status: document.status,
          createdAt: new Date()
        }
      },
      $set: { updatedAt: new Date() }
    }
  );
  
  return success(res, {
    document: { ...document, _id: result.insertedId },
    message: document.status === 'approved' 
      ? 'Document added successfully' 
      : 'Document submitted successfully and pending review'
  }, 201);
});

// Get document by ID
const getDocumentById = asyncHandler(async (req, res) => {
  const db = getDB();
  const documentId = req.params.documentId;
  
  const document = await db.collection('documents').findOne({
    _id: new ObjectId(documentId)
  });
  
  if (!document) {
    return error(res, 'Document not found', 404);
  }
  
  // Check if user is authorized to view this document
  const startup = await db.collection('startups').findOne({
    _id: document.startupId
  });
  
  if (!startup) {
    return error(res, 'Associated startup not found', 404);
  }
  
  // Allow access to: admin, founder of the startup, or investors with accepted offers
  const isAdmin = req.user.role === 'admin';
  const isFounder = startup.founderId.toString() === req.user.id;
  const isAcceptedInvestor = startup.investors.some(
    inv => inv.investorId.toString() === req.user.id && inv.status === 'accepted'
  );
  
  if (!isAdmin && !isFounder && !isAcceptedInvestor) {
    return error(res, 'Not authorized to view this document', 403);
  }
  
  return success(res, { document });
});

// Review document (admin only)
const reviewDocument = asyncHandler(async (req, res) => {
  const db = getDB();
  const documentId = req.params.documentId;
  const { status, feedback } = req.body;
  
  // Validate status
  if (!status || !['approved', 'rejected'].includes(status)) {
    return error(res, 'Please provide a valid status (approved or rejected)', 400);
  }
  
  // Check if document exists
  const document = await db.collection('documents').findOne({
    _id: new ObjectId(documentId)
  });
  
  if (!document) {
    return error(res, 'Document not found', 404);
  }
  
  // Update document status
  const updateData = {
    status,
    reviewedAt: new Date(),
    reviewedBy: new ObjectId(req.user.id),
    updatedAt: new Date()
  };
  
  if (feedback) {
    updateData.feedback = feedback;
  }
  
  await db.collection('documents').updateOne(
    { _id: new ObjectId(documentId) },
    { $set: updateData }
  );
  
  // Update status in startup's documents array
  await db.collection('startups').updateOne(
    { 
      _id: document.startupId,
      'documents.documentId': new ObjectId(documentId)
    },
    { 
      $set: { 
        'documents.$.status': status,
        'documents.$.reviewedAt': new Date(),
        updatedAt: new Date()
      } 
    }
  );
  
  // Get updated document
  const updatedDocument = await db.collection('documents').findOne({
    _id: new ObjectId(documentId)
  });
  
  return success(res, {
    document: updatedDocument,
    message: `Document ${status} successfully`
  });
});

// Accept investor offer
const acceptInvestorOffer = asyncHandler(async (req, res) => {
  const db = getDB();
  const startupId = req.params.startupId;
  const investorId = req.params.investorId;
  
  // Check if startup exists
  const startup = await db.collection('startups').findOne({
    _id: new ObjectId(startupId)
  });
  
  if (!startup) {
    return error(res, 'Startup not found', 404);
  }
  
  // Check if user is the founder
  if (startup.founderId.toString() !== req.user.id) {
    return error(res, 'Not authorized to accept offers for this startup', 403);
  }
  
  // Check if startup is approved
  if (startup.status !== 'approved') {
    return error(res, 'Cannot accept offers for a startup that is not approved', 400);
  }
  
  // Find the investor in the startup's investors array
  const investorIndex = startup.investors.findIndex(
    inv => inv.investorId.toString() === investorId
  );
  
  if (investorIndex === -1) {
    return error(res, 'Investor offer not found', 404);
  }
  
  // Check if offer is already accepted
  if (startup.investors[investorIndex].status === 'accepted') {
    return error(res, 'Offer already accepted', 400);
  }
  
  // Update investor status in startup
  await db.collection('startups').updateOne(
    { 
      _id: new ObjectId(startupId),
      'investors.investorId': new ObjectId(investorId)
    },
    { 
      $set: { 
        'investors.$.status': 'accepted',
        'investors.$.acceptedAt': new Date(),
        updatedAt: new Date()
      } 
    }
  );
  
  // Update investor's investments
  const investorOffer = startup.investors[investorIndex];
  
  await db.collection('investorProfiles').updateOne(
    { userId: new ObjectId(investorId) },
    { 
      $push: { 
        investmentsMade: {
          startupId: new ObjectId(startupId),
          startupName: startup.name,
          equityReceived: investorOffer.equityRequested,
          amountInvested: investorOffer.amountOffered,
          investedAt: new Date()
        } 
      },
      $set: {
        'interestedStartups.$[elem].status': 'accepted',
        'interestedStartups.$[elem].acceptedAt': new Date()
      }
    },
    {
      arrayFilters: [
        { 'elem.startupId': new ObjectId(startupId) }
      ]
    }
  );
  
  // Update user's investments
  await db.collection('users').updateOne(
    { _id: new ObjectId(investorId) },
    { 
      $push: { 
        investmentsMade: {
          startupId: new ObjectId(startupId),
          startupName: startup.name,
          equityReceived: investorOffer.equityRequested,
          amountInvested: investorOffer.amountOffered,
          investedAt: new Date()
        } 
      }
    }
  );
  
  // Create notification for investor
  await db.collection('notifications').insertOne({
    userId: new ObjectId(investorId),
    type: 'investment_accepted',
    title: `Your investment offer for ${startup.name} was accepted!`,
    message: `The founder has accepted your investment offer of ${investorOffer.amountOffered} for ${investorOffer.equityRequested}% equity.`,
    read: false,
    createdAt: new Date()
  });
  
  return success(res, {
    message: 'Investor offer accepted successfully'
  });
});

// Reject investor offer
const rejectInvestorOffer = asyncHandler(async (req, res) => {
  const db = getDB();
  const startupId = req.params.startupId;
  const investorId = req.params.investorId;
  const { feedback } = req.body;
  
  // Check if startup exists
  const startup = await db.collection('startups').findOne({
    _id: new ObjectId(startupId)
  });
  
  if (!startup) {
    return error(res, 'Startup not found', 404);
  }
  
  // Check if user is the founder
  if (startup.founderId.toString() !== req.user.id) {
    return error(res, 'Not authorized to reject offers for this startup', 403);
  }
  
  // Find the investor in the startup's investors array
  const investorIndex = startup.investors.findIndex(
    inv => inv.investorId.toString() === investorId
  );
  
  if (investorIndex === -1) {
    return error(res, 'Investor offer not found', 404);
  }
  
  // Check if offer is already rejected
  if (startup.investors[investorIndex].status === 'rejected') {
    return error(res, 'Offer already rejected', 400);
  }
  
  // Update investor status in startup
  await db.collection('startups').updateOne(
    { 
      _id: new ObjectId(startupId),
      'investors.investorId': new ObjectId(investorId)
    },
    { 
      $set: { 
        'investors.$.status': 'rejected',
        'investors.$.rejectedAt': new Date(),
        'investors.$.feedback': feedback || 'No feedback provided',
        updatedAt: new Date()
      } 
    }
  );
  
  // Update investor's interested startups
  await db.collection('investorProfiles').updateOne(
    { userId: new ObjectId(investorId) },
    { 
      $set: {
        'interestedStartups.$[elem].status': 'rejected',
        'interestedStartups.$[elem].rejectedAt': new Date(),
        'interestedStartups.$[elem].feedback': feedback || 'No feedback provided'
      }
    },
    {
      arrayFilters: [
        { 'elem.startupId': new ObjectId(startupId) }
      ]
    }
  );
  
  // Create notification for investor
  await db.collection('notifications').insertOne({
    userId: new ObjectId(investorId),
    type: 'investment_rejected',
    title: `Your investment offer for ${startup.name} was declined`,
    message: feedback || 'The founder has declined your investment offer.',
    read: false,
    createdAt: new Date()
  });
  
  return success(res, {
    message: 'Investor offer rejected successfully'
  });
});

// Get all documents for a startup
const getStartupDocuments = asyncHandler(async (req, res) => {
  const db = getDB();
  const startupId = req.params.id;
  
  // Check if startup exists
  const startup = await db.collection('startups').findOne({
    _id: new ObjectId(startupId)
  });
  
  if (!startup) {
    return error(res, 'Startup not found', 404);
  }
  
  // Check if user is authorized
  const isAdmin = req.user.role === 'admin';
  const isFounder = startup.founderId.toString() === req.user.id;
  const isAcceptedInvestor = startup.investors.some(
    inv => inv.investorId.toString() === req.user.id && inv.status === 'accepted'
  );
  
  if (!isAdmin && !isFounder && !isAcceptedInvestor) {
    return error(res, 'Not authorized to view documents for this startup', 403);
  }
  
  const documents = await db.collection('documents')
    .find({ 
      startupId: new ObjectId(startupId),
      status: isAdmin || isFounder ? { $in: ['pending', 'approved', 'rejected'] } : 'approved'
    })
    .toArray();
  
  return success(res, { documents });
});

module.exports = {
  handlePaperwork,
  getDocumentById,
  reviewDocument,
  acceptInvestorOffer,
  rejectInvestorOffer,
  getStartupDocuments
};