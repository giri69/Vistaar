const { ObjectId } = require('mongodb');
const { getDB } = require('../config/db');
const { asyncHandler } = require('../utils/errorHandler');
const { success, error } = require('../utils/responseHandler');

// Get founder profile
const getProfile = asyncHandler(async (req, res) => {
  const db = getDB();
  const userId = req.user.id;
  
  const founderProfile = await db.collection('founderProfiles').findOne({ 
    userId: new ObjectId(userId) 
  });
  
  if (!founderProfile) {
    return error(res, 'Founder profile not found', 404);
  }
  
  return success(res, { profile: founderProfile });
});

// Update founder profile
const updateProfile = asyncHandler(async (req, res) => {
  const db = getDB();
  const userId = req.user.id;
  const { 
    bio, 
    skills, 
    experience, 
    education,
    achievements,
    socialLinks
  } = req.body;
  
  const updateData = {
    updatedAt: new Date()
  };
  
  if (bio) updateData.bio = bio;
  if (skills) updateData.skills = skills;
  if (experience) updateData.experience = experience;
  if (education) updateData.education = education;
  if (achievements) updateData.achievements = achievements;
  if (socialLinks) updateData.socialLinks = socialLinks;
  
  const result = await db.collection('founderProfiles').updateOne(
    { userId: new ObjectId(userId) },
    { $set: updateData }
  );
  
  if (result.matchedCount === 0) {
    return error(res, 'Founder profile not found', 404);
  }
  
  const updatedProfile = await db.collection('founderProfiles').findOne({ 
    userId: new ObjectId(userId) 
  });
  
  return success(res, { profile: updatedProfile });
});

// Submit a new startup application
const submitStartupApplication = asyncHandler(async (req, res) => {
  const db = getDB();
  const userId = req.user.id;
  
  const { 
    name, 
    description, 
    industry, 
    fundingNeeded, 
    equityOffered, 
    problem,
    solution,
    marketSize,
    competitiveLandscape,
    businessModel,
    teamMembers,
    pitchMaterials
  } = req.body;
  
  // Validate required fields
  if (!name || !description || !industry || !fundingNeeded || !equityOffered) {
    return error(res, 'Please provide all required fields', 400);
  }
  
  // Validate pitch materials
  if (!pitchMaterials || !Array.isArray(pitchMaterials)) {
    return error(res, 'Pitch materials must be an array', 400);
  }

  // Check for required pitch materials
  const hasBanner = pitchMaterials.some(item => item.type === 'banner');
  const hasLogo = pitchMaterials.some(item => item.type === 'logo');
  
  if (!hasBanner || !hasLogo) {
    return error(res, 'Pitch materials must include at least a banner and logo', 400);
  }
  
  // Check if startup name already exists
  const existingStartup = await db.collection('startups').findOne({ name });
  if (existingStartup) {
    return error(res, 'Startup name already exists', 400);
  }
  
  // Create startup object
  const newStartup = {
    name,
    description,
    industry,
    fundingNeeded,
    equityOffered,
    problem: problem || '',
    solution: solution || '',
    marketSize: marketSize || '',
    competitiveLandscape: competitiveLandscape || '',
    businessModel: businessModel || '',
    teamMembers: teamMembers || [],
    pitchMaterials: pitchMaterials.map(item => ({
      type: item.type,
      url: item.url,
      description: item.description || '',
      uploadedAt: new Date()
    })),
    founderId: new ObjectId(userId),
    status: 'pending', // pending, approved, rejected
    investors: [],
    platformEquity: 2, // Fixed 2% equity for the platform
    applicationDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  // Insert startup into database
  const result = await db.collection('startups').insertOne(newStartup);
  
  // Update founder's startups array
  await db.collection('founderProfiles').updateOne(
    { userId: new ObjectId(userId) },
    { $push: { startups: result.insertedId } }
  );
  
  // Update user's startups array
  await db.collection('users').updateOne(
    { _id: new ObjectId(userId) },
    { $push: { startups: result.insertedId } }
  );
  
  return success(res, { 
    startup: { ...newStartup, _id: result.insertedId },
    message: 'Startup application submitted successfully and pending approval'
  }, 201);
});

// Add additional pitch materials to startup
const addPitchMaterials = asyncHandler(async (req, res) => {
  const db = getDB();
  const userId = req.user.id;
  const startupId = req.params.id;
  const { materials } = req.body;
  
  // Validate materials
  if (!materials || !Array.isArray(materials) || materials.length === 0) {
    return error(res, 'Please provide valid pitch materials', 400);
  }
  
  // Check if startup exists and belongs to the founder
  const startup = await db.collection('startups').findOne({
    _id: new ObjectId(startupId),
    founderId: new ObjectId(userId)
  });
  
  if (!startup) {
    return error(res, 'Startup not found or you do not have access', 404);
  }
  
  // Format new materials
  const newMaterials = materials.map(item => ({
    type: item.type,
    url: item.url,
    description: item.description || '',
    uploadedAt: new Date()
  }));
  
  // Add materials to startup
  await db.collection('startups').updateOne(
    { _id: new ObjectId(startupId) },
    { 
      $push: { 
        pitchMaterials: { $each: newMaterials } 
      },
      $set: { updatedAt: new Date() }
    }
  );
  
  const updatedStartup = await db.collection('startups').findOne({
    _id: new ObjectId(startupId)
  });
  
  return success(res, { 
    startup: updatedStartup,
    message: 'Pitch materials added successfully'
  });
});

// Get all startups by founder
const getStartups = asyncHandler(async (req, res) => {
  const db = getDB();
  const userId = req.user.id;
  const { status } = req.query;
  
  const filter = { founderId: new ObjectId(userId) };
  
  // Add status filter if provided
  if (status && ['pending', 'approved', 'rejected'].includes(status)) {
    filter.status = status;
  }
  
  const startups = await db.collection('startups')
    .find(filter)
    .toArray();
  
  return success(res, { startups });
});

// Get startup by ID
const getStartupById = asyncHandler(async (req, res) => {
  const db = getDB();
  const userId = req.user.id;
  const startupId = req.params.id;
  
  const startup = await db.collection('startups').findOne({
    _id: new ObjectId(startupId),
    founderId: new ObjectId(userId)
  });
  
  if (!startup) {
    return error(res, 'Startup not found or you do not have access', 404);
  }
  
  return success(res, { startup });
});

// Update startup
const updateStartup = asyncHandler(async (req, res) => {
  const db = getDB();
  const userId = req.user.id;
  const startupId = req.params.id;
  
  // Get allowed fields to update
  const { 
    description, 
    problem,
    solution,
    marketSize,
    competitiveLandscape,
    businessModel,
    teamMembers,
    fundingNeeded, 
    equityOffered 
  } = req.body;
  
  const updateData = {
    updatedAt: new Date()
  };
  
  if (description) updateData.description = description;
  if (problem) updateData.problem = problem;
  if (solution) updateData.solution = solution;
  if (marketSize) updateData.marketSize = marketSize;
  if (competitiveLandscape) updateData.competitiveLandscape = competitiveLandscape;
  if (businessModel) updateData.businessModel = businessModel;
  if (teamMembers) updateData.teamMembers = teamMembers;
  if (fundingNeeded) updateData.fundingNeeded = fundingNeeded;
  if (equityOffered) updateData.equityOffered = equityOffered;
  
  // Check if startup exists, belongs to the founder, and is not already approved
  const startup = await db.collection('startups').findOne({
    _id: new ObjectId(startupId),
    founderId: new ObjectId(userId)
  });
  
  if (!startup) {
    return error(res, 'Startup not found or you do not have access', 404);
  }
  
  if (startup.status === 'approved') {
    // For approved startups, only allow certain updates
    delete updateData.equityOffered; // Don't allow changing equity once approved
  }
  
  // Update startup
  const result = await db.collection('startups').updateOne(
    { _id: new ObjectId(startupId), founderId: new ObjectId(userId) },
    { $set: updateData }
  );
  
  const updatedStartup = await db.collection('startups').findOne({
    _id: new ObjectId(startupId)
  });
  
  return success(res, { 
    startup: updatedStartup,
    message: 'Startup updated successfully'
  });
});

// Get investors interested in founder's startups
const getInterestedInvestors = asyncHandler(async (req, res) => {
  const db = getDB();
  const userId = req.user.id;
  const startupId = req.params.startupId;
  
  // Check if startup exists and belongs to the founder
  const startup = await db.collection('startups').findOne({
    _id: new ObjectId(startupId),
    founderId: new ObjectId(userId)
  });
  
  if (!startup) {
    return error(res, 'Startup not found or you do not have access', 404);
  }
  
  // Get investor IDs from startup's investors array
  const investorIds = startup.investors.map(inv => new ObjectId(inv.investorId));
  
  if (investorIds.length === 0) {
    return success(res, { investors: [] });
  }
  
  // Get investor profiles
  const investors = await db.collection('investorProfiles')
    .find({ userId: { $in: investorIds } })
    .toArray();
  
  // Combine with offer details
  const investorsWithOffers = investors.map(investor => {
    const offerDetails = startup.investors.find(
      inv => inv.investorId.toString() === investor.userId.toString()
    );
    
    return {
      ...investor,
      offer: offerDetails
    };
  });
  
  return success(res, { investors: investorsWithOffers });
});

module.exports = {
  getProfile,
  updateProfile,
  submitStartupApplication,
  addPitchMaterials,
  getStartups,
  getStartupById,
  updateStartup,
  getInterestedInvestors
};