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
  const { 
    bio, 
    expertise, 
    connections, 
    supportOfferings,
    investmentInterests,
    socialLinks
  } = req.body;
  
  const updateData = {
    updatedAt: new Date()
  };
  
  if (bio) updateData.bio = bio;
  if (expertise) updateData.expertise = expertise;
  if (connections) updateData.connections = connections;
  if (supportOfferings) updateData.supportOfferings = supportOfferings;
  if (investmentInterests) updateData.investmentInterests = investmentInterests;
  if (socialLinks) updateData.socialLinks = socialLinks;
  
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

// Get all approved startups for potential support
const getAvailableStartups = asyncHandler(async (req, res) => {
  const db = getDB();
  const { industry, search } = req.query;
  
  const filter = { status: 'approved' };
  
  // Industry filter
  if (industry) {
    filter.industry = industry;
  }
  
  // Search by name or description
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }
  
  const startups = await db.collection('startups')
    .find(filter)
    .project({
      name: 1,
      description: 1,
      industry: 1,
      fundingNeeded: 1,
      equityOffered: 1,
      pitchMaterials: {
        $filter: {
          input: "$pitchMaterials",
          as: "material",
          cond: { $in: ["$$material.type", ["banner", "logo"]] }
        }
      },
      createdAt: 1
    })
    .toArray();
  
  return success(res, { startups });
});

// Get detailed information about a startup
const getStartupDetails = asyncHandler(async (req, res) => {
  const db = getDB();
  const startupId = req.params.id;
  
  const startup = await db.collection('startups').findOne({
    _id: new ObjectId(startupId),
    status: 'approved'
  });
  
  if (!startup) {
    return error(res, 'Startup not found or not approved', 404);
  }
  
  // Get founder basic info (without sensitive data)
  const founder = await db.collection('founderProfiles').findOne(
    { userId: startup.founderId },
    { 
      projection: { 
        name: 1, 
        bio: 1, 
        skills: 1, 
        achievements: 1,
        socialLinks: 1 
      } 
    }
  );
  
  // Check if investor has already expressed interest
  const hasInterest = startup.investors && startup.investors.some(
    inv => inv.investorId.toString() === req.user.id
  );
  
  return success(res, { 
    startup,
    founder,
    hasExpressedInterest: hasInterest
  });
});

// Express interest in supporting a startup
const expressInterest = asyncHandler(async (req, res) => {
  const db = getDB();
  const userId = req.user.id;
  const startupId = req.params.startupId;
  const { 
    supportType,
    supportDetails,
    equityRequested,
    valueProposition
  } = req.body;
  
  // Validate required fields
  if (!supportType || !supportDetails || !equityRequested) {
    return error(res, 'Please provide support type, details, and equity requested', 400);
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
  const alreadyInterested = startup.investors && startup.investors.some(
    inv => inv.investorId.toString() === userId.toString()
  );
  
  if (alreadyInterested) {
    return error(res, 'You have already expressed interest in this startup', 400);
  }
  
  // Add investor to startup's investors array
  const interestData = {
    investorId: new ObjectId(userId),
    investorName: investor.name,
    supportType,
    supportDetails,
    equityRequested,
    valueProposition: valueProposition || '',
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
          supportType,
          equityRequested,
          status: 'pending',
          createdAt: new Date()
        } 
      } 
    }
  );
  
  // Create notification for founder
  await db.collection('notifications').insertOne({
    userId: startup.founderId,
    type: 'new_interest',
    title: `New interest in ${startup.name}`,
    message: `${investor.name} has expressed interest in supporting your startup.`,
    read: false,
    createdAt: new Date()
  });
  
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
    
    // Also get the detailed interest data from the startup
    const startupInterest = startup.investors && startup.investors.find(
      inv => inv.investorId.toString() === userId
    );
    
    return {
      ...startup,
      interestDetails: {
        ...interest,
        detailedInterest: startupInterest
      }
    };
  });
  
  return success(res, { interestedStartups });
});

// Get all contributions made by the investor
const getContributions = asyncHandler(async (req, res) => {
  const db = getDB();
  const userId = req.user.id;
  
  const profile = await db.collection('investorProfiles').findOne({
    userId: new ObjectId(userId)
  });
  
  if (!profile || !profile.contributions) {
    return success(res, { contributions: [] });
  }
  
  // Get additional details for each contribution
  const contributionsWithDetails = await Promise.all(
    profile.contributions.map(async (contribution) => {
      const startup = await db.collection('startups').findOne(
        { _id: new ObjectId(contribution.startupId) },
        { 
          projection: { 
            name: 1, 
            description: 1, 
            industry: 1,
            status: 1,
            pitchMaterials: {
              $filter: {
                input: "$pitchMaterials",
                as: "material",
                cond: { $eq: ["$$material.type", "logo"] }
              }
            }
          } 
        }
      );
      
      return {
        ...contribution,
        startupDetails: startup || { name: "Unknown Startup" }
      };
    })
  );
  
  return success(res, { contributions: contributionsWithDetails });
});

module.exports = {
  getProfile,
  updateProfile,
  getAvailableStartups,
  getStartupDetails,
  expressInterest,
  getInterestedStartups,
  getContributions
};