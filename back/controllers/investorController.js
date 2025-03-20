const { ObjectId } = require('mongodb');
const { getDB } = require('../config/db');
const { asyncHandler } = require('../utils/errorHandler');
const { success, error } = require('../utils/responseHandler');

// Get investor profile
const getProfile = asyncHandler(async (req, res) => {
  const db = getDB();
  const userId = req.user.id;
  
  const investorProfile = await db.collection('investorProfiles').findOne({ 
    userId: new ObjectId(userId) 
  });
  
  if (!investorProfile) {
    return error(res, 'Investor profile not found', 404);
  }
  
  return success(res, { profile: investorProfile });
});

// Update investor profile
const updateProfile = asyncHandler(async (req, res) => {
  const db = getDB();
  const userId = req.user.id;
  const { bio, expertise, connections, investmentInterests } = req.body;
  
  const updateData = {
    updatedAt: new Date()
  };
  
  if (bio) updateData.bio = bio;
  if (expertise) updateData.expertise = expertise;
  if (connections) updateData.connections = connections;
  if (investmentInterests) updateData.investmentInterests = investmentInterests;
  
  const result = await db.collection('investorProfiles').updateOne(
    { userId: new ObjectId(userId) },
    { $set: updateData }
  );
  
  if (result.matchedCount === 0) {
    return error(res, 'Investor profile not found', 404);
  }
  
  const updatedProfile = await db.collection('investorProfiles').findOne({ 
    userId: new ObjectId(userId) 
  });
  
  return success(res, { profile: updatedProfile });
});

// Get all approved startups for potential investment
const getAvailableStartups = asyncHandler(async (req, res) => {
  const db = getDB();
  
  const startups = await db.collection('startups')
    .find({ status: 'approved' })
    .toArray();
  
  return success(res, { startups });
});

// Express interest in a startup
const expressInterest = asyncHandler(async (req, res) => {
  const db = getDB();
  const userId = req.user.id;
  const startupId = req.params.startupId;
  const { offerDetails, equityRequested, amountOffered } = req.body;
  
  // Validate required fields
  if (!equityRequested || !amountOffered) {
    return error(res, 'Please provide equity requested and amount offered', 400);
  }
  
  // Check if startup exists and is approved
  const startup = await db.collection('startups').findOne({
    _id: new ObjectId(startupId),
    status: 'approved'
  });
  
  if (!startup) {
    return error(res, 'Startup not found or not approved', 404);
  }
  
  // Get investor profile
  const investor = await db.collection('investorProfiles').findOne({
    userId: new ObjectId(userId)
  });
  
  if (!investor) {
    return error(res, 'Investor profile not found', 404);
  }
  
  // Check if investor has already expressed interest
  const alreadyInterested = startup.investors.some(
    inv => inv.investorId.toString() === userId.toString()
  );
  
  if (alreadyInterested) {
    return error(res, 'You have already expressed interest in this startup', 400);
  }
  
  // Add investor to startup's investors array
  const interestData = {
    investorId: new ObjectId(userId),
    investorName: investor.name,
    equityRequested,
    amountOffered,
    offerDetails: offerDetails || '',
    status: 'pending', // pending, accepted, rejected
    createdAt: new Date()
  };
  
  await db.collection('startups').updateOne(
    { _id: new ObjectId(startupId) },
    { $push: { investors: interestData } }
  );
  
  // Add startup to investor's interests
  await db.collection('investorProfiles').updateOne(
    { userId: new ObjectId(userId) },
    { 
      $push: { 
        interestedStartups: {
          startupId: new ObjectId(startupId),
          startupName: startup.name,
          equityRequested,
          amountOffered,
          status: 'pending',
          createdAt: new Date()
        } 
      } 
    }
  );
  
  return success(res, { 
    message: 'Interest expressed successfully',
    interest: interestData
  });
});

// Get all startups the investor has expressed interest in
const getInterestedStartups = asyncHandler(async (req, res) => {
  const db = getDB();
  const userId = req.user.id;
  
  const profile = await db.collection('investorProfiles').findOne({
    userId: new ObjectId(userId)
  });
  
  if (!profile || !profile.interestedStartups) {
    return success(res, { interestedStartups: [] });
  }
  
  const startupIds = profile.interestedStartups.map(
    interest => new ObjectId(interest.startupId)
  );
  
  if (startupIds.length === 0) {
    return success(res, { interestedStartups: [] });
  }
  
  const startups = await db.collection('startups')
    .find({ _id: { $in: startupIds } })
    .toArray();
  
  // Combine startup data with interest data
  const interestedStartups = startups.map(startup => {
    const interest = profile.interestedStartups.find(
      int => int.startupId.toString() === startup._id.toString()
    );
    
    return {
      ...startup,
      interestDetails: interest
    };
  });
  
  return success(res, { interestedStartups });
});

// Get all investments made by the investor
const getInvestments = asyncHandler(async (req, res) => {
  const db = getDB();
  const userId = req.user.id;
  
  const profile = await db.collection('investorProfiles').findOne({
    userId: new ObjectId(userId)
  });
  
  if (!profile || !profile.investmentsMade) {
    return success(res, { investments: [] });
  }
  
  return success(res, { investments: profile.investmentsMade });
});

module.exports = {
  getProfile,
  updateProfile,
  getAvailableStartups,
  expressInterest,
  getInterestedStartups,
  getInvestments
};