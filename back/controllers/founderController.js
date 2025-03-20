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
  
  console.log("Received startup data:", req.body);
  
  const { 
    name, // Title/Company Name
    description,
    logoUrl,
    applicationVideoUrl,
    supportingDocumentUrl,
    // Default values for other required fields
    industry = 'tech',
    fundingNeeded = 10000,
    equityOffered = 10
  } = req.body;
  
  // Validate required fields
  if (!name || !description || !logoUrl) {
    console.log("Validation failed:", { name, description, logoUrl });
    return error(res, 'Please provide all required fields: name, description, and logo URL', 400);
  }
  
  // Create pitch materials array from provided URLs
  const pitchMaterials = [
    {
      type: 'logo',
      url: logoUrl,
      description: 'Company logo',
      uploadedAt: new Date()
    }
  ];
  
  // Add application video if provided
  if (applicationVideoUrl) {
    pitchMaterials.push({
      type: 'video',
      url: applicationVideoUrl,
      description: 'Application video',
      uploadedAt: new Date()
    });
  }
  
  // Add supporting document if provided
  if (supportingDocumentUrl) {
    pitchMaterials.push({
      type: 'document',
      url: supportingDocumentUrl,
      description: 'Supporting document',
      uploadedAt: new Date()
    });
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
    fundingNeeded: Number(fundingNeeded),
    equityOffered: Number(equityOffered),
    pitchMaterials,
    founderId: new ObjectId(userId),
    status: 'pending', // pending, approved, rejected
    investors: [],
    platformEquity: 2, // Fixed 2% equity for the platform
    applicationDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  try {
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
    
    // Create notification for admins
    const admins = await db.collection('users').find({ role: 'admin' }).toArray();
    
    // Notify all admins about the new startup application
    if (admins && admins.length > 0) {
      const notifications = admins.map(admin => ({
        userId: admin._id,
        type: 'new_startup',
        title: 'New Startup Application',
        message: `A new startup "${name}" has been submitted for review.`,
        read: false,
        createdAt: new Date()
      }));
      
      if (notifications.length > 0) {
        await db.collection('notifications').insertMany(notifications);
      }
    }
    
    return success(res, { 
      startup: { ...newStartup, _id: result.insertedId },
      message: 'Startup application submitted successfully and pending approval'
    }, 201);
  } catch (err) {
    console.error("Database error:", err);
    return error(res, 'Database error occurred while creating startup', 500);
  }
});

// Add additional pitch materials to startup
const addPitchMaterials = asyncHandler(async (req, res) => {
  const db = getDB();
  const userId = req.user.id;
  const startupId = req.params.id;
  const { 
    logoUrl,
    applicationVideoUrl,
    supportingDocumentUrl
  } = req.body;
  
  // Check if startup exists and belongs to the founder
  const startup = await db.collection('startups').findOne({
    _id: new ObjectId(startupId),
    founderId: new ObjectId(userId)
  });
  
  if (!startup) {
    return error(res, 'Startup not found or you do not have access', 404);
  }
  
  // Get existing pitch materials
  const pitchMaterials = [...startup.pitchMaterials];
  
  // Update logo URL if provided
  if (logoUrl) {
    const logoIndex = pitchMaterials.findIndex(item => item.type === 'logo');
    if (logoIndex >= 0) {
      pitchMaterials[logoIndex].url = logoUrl;
      pitchMaterials[logoIndex].updatedAt = new Date();
    } else {
      pitchMaterials.push({
        type: 'logo',
        url: logoUrl,
        description: 'Company logo',
        uploadedAt: new Date()
      });
    }
  }
  
  // Update video URL if provided
  if (applicationVideoUrl) {
    const videoIndex = pitchMaterials.findIndex(item => item.type === 'video');
    if (videoIndex >= 0) {
      pitchMaterials[videoIndex].url = applicationVideoUrl;
      pitchMaterials[videoIndex].updatedAt = new Date();
    } else {
      pitchMaterials.push({
        type: 'video',
        url: applicationVideoUrl,
        description: 'Application video',
        uploadedAt: new Date()
      });
    }
  }
  
  // Update document URL if provided
  if (supportingDocumentUrl) {
    const docIndex = pitchMaterials.findIndex(item => item.type === 'document');
    if (docIndex >= 0) {
      pitchMaterials[docIndex].url = supportingDocumentUrl;
      pitchMaterials[docIndex].updatedAt = new Date();
    } else {
      pitchMaterials.push({
        type: 'document',
        url: supportingDocumentUrl,
        description: 'Supporting document',
        uploadedAt: new Date()
      });
    }
  }
  
  // Update startup
  await db.collection('startups').updateOne(
    { _id: new ObjectId(startupId) },
    { 
      $set: { 
        pitchMaterials: pitchMaterials,
        updatedAt: new Date()
      }
    }
  );
  
  const updatedStartup = await db.collection('startups').findOne({
    _id: new ObjectId(startupId)
  });
  
  return success(res, { 
    startup: updatedStartup,
    message: 'Pitch materials updated successfully'
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
  
  const { 
    name,
    description,
    logoUrl,
    applicationVideoUrl,
    supportingDocumentUrl,
    // These fields might be updated too
    industry,
    fundingNeeded,
    equityOffered
  } = req.body;
  
  // Check if startup exists and belongs to the founder
  const startup = await db.collection('startups').findOne({
    _id: new ObjectId(startupId),
    founderId: new ObjectId(userId)
  });
  
  if (!startup) {
    return error(res, 'Startup not found or you do not have access', 404);
  }
  
  // Don't allow updates if status is approved and equity is being changed
  const restrictedUpdate = startup.status === 'approved' && 
                           equityOffered !== undefined && 
                           equityOffered !== startup.equityOffered;
  if (restrictedUpdate) {
    return error(res, 'Cannot update equity offered once startup is approved', 400);
  }
  
  // Prepare update data
  const updateData = {
    updatedAt: new Date()
  };
  
  if (name) updateData.name = name;
  if (description) updateData.description = description;
  if (industry) updateData.industry = industry;
  if (fundingNeeded) updateData.fundingNeeded = Number(fundingNeeded);
  if (equityOffered) updateData.equityOffered = Number(equityOffered);
  
  // Update pitch materials if new URLs are provided
  if (logoUrl || applicationVideoUrl || supportingDocumentUrl) {
    const pitchMaterials = [...startup.pitchMaterials];
    
    // Update logo URL if provided
    if (logoUrl) {
      const logoIndex = pitchMaterials.findIndex(item => item.type === 'logo');
      if (logoIndex >= 0) {
        pitchMaterials[logoIndex].url = logoUrl;
        pitchMaterials[logoIndex].updatedAt = new Date();
      } else {
        pitchMaterials.push({
          type: 'logo',
          url: logoUrl,
          description: 'Company logo',
          uploadedAt: new Date()
        });
      }
    }
    
    // Update video URL if provided
    if (applicationVideoUrl) {
      const videoIndex = pitchMaterials.findIndex(item => item.type === 'video');
      if (videoIndex >= 0) {
        pitchMaterials[videoIndex].url = applicationVideoUrl;
        pitchMaterials[videoIndex].updatedAt = new Date();
      } else {
        pitchMaterials.push({
          type: 'video',
          url: applicationVideoUrl,
          description: 'Application video',
          uploadedAt: new Date()
        });
      }
    }
    
    // Update document URL if provided
    if (supportingDocumentUrl) {
      const docIndex = pitchMaterials.findIndex(item => item.type === 'document');
      if (docIndex >= 0) {
        pitchMaterials[docIndex].url = supportingDocumentUrl;
        pitchMaterials[docIndex].updatedAt = new Date();
      } else {
        pitchMaterials.push({
          type: 'document',
          url: supportingDocumentUrl,
          description: 'Supporting document',
          uploadedAt: new Date()
        });
      }
    }
    
    updateData.pitchMaterials = pitchMaterials;
  }
  
  // Update startup
  await db.collection('startups').updateOne(
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

// Get interested investors for a startup
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