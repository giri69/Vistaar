const { ObjectId } = require('mongodb');
const { getDB } = require('../config/db');
const { asyncHandler } = require('../utils/errorHandler');
const { success, error } = require('../utils/responseHandler');

// Get all startups with filters
const getAllStartups = asyncHandler(async (req, res) => {
  const db = getDB();
  const { status, industry, search } = req.query;
  
  const filter = {};
  
  // Status filter
  if (status && ['pending', 'approved', 'rejected'].includes(status)) {
    filter.status = status;
  }
  
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
    .toArray();
  
  return success(res, { startups });
});

// Get startup details
const getStartupDetails = asyncHandler(async (req, res) => {
  const db = getDB();
  const startupId = req.params.id;
  
  // Get startup
  const startup = await db.collection('startups').findOne({
    _id: new ObjectId(startupId)
  });
  
  if (!startup) {
    return error(res, 'Startup not found', 404);
  }
  
  // Get founder details
  const founder = await db.collection('founderProfiles').findOne({
    userId: startup.founderId
  });
  
  return success(res, { 
    startup,
    founder: founder || null
  });
});

// Review startup application
const reviewStartupApplication = asyncHandler(async (req, res) => {
  const db = getDB();
  const startupId = req.params.id;
  const { status, feedback, suggestedChanges } = req.body;
  
  // Validate status
  if (!status || !['approved', 'rejected', 'changes_requested'].includes(status)) {
    return error(res, 'Please provide a valid status (approved, rejected, or changes_requested)', 400);
  }
  
  // Check if startup exists
  const startup = await db.collection('startups').findOne({
    _id: new ObjectId(startupId)
  });
  
  if (!startup) {
    return error(res, 'Startup not found', 404);
  }
  
  // Update startup status
  const updateData = {
    status,
    reviewedAt: new Date(),
    reviewedBy: new ObjectId(req.user.id),
    updatedAt: new Date()
  };
  
  if (feedback) {
    updateData.feedback = feedback;
  }
  
  if (suggestedChanges) {
    updateData.suggestedChanges = suggestedChanges;
  }
  
  const result = await db.collection('startups').updateOne(
    { _id: new ObjectId(startupId) },
    { $set: updateData }
  );
  
  // Get updated startup
  const updatedStartup = await db.collection('startups').findOne({
    _id: new ObjectId(startupId)
  });
  
  // Create notification for founder
  await db.collection('notifications').insertOne({
    userId: startup.founderId,
    type: 'startup_review',
    title: `Your startup ${startup.name} was ${status.replace('_', ' ')}`,
    message: feedback || `An admin has ${status.replace('_', ' ')} your startup application.`,
    read: false,
    createdAt: new Date()
  });
  
  return success(res, { 
    startup: updatedStartup,
    message: `Startup ${status.replace('_', ' ')} successfully`
  });
});

// Get all users
const getAllUsers = asyncHandler(async (req, res) => {
  const db = getDB();
  const { role, search } = req.query;
  
  const filter = {};
  
  // Role filter
  if (role && ['founder', 'investor', 'admin'].includes(role)) {
    filter.role = role;
  }
  
  // Search by name or email
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }
  
  const users = await db.collection('users')
    .find(filter)
    .project({ password: 0 })
    .toArray();
  
  return success(res, { users });
});

// Get user details by ID
const getUserDetails = asyncHandler(async (req, res) => {
  const db = getDB();
  const userId = req.params.id;
  
  // Get user
  const user = await db.collection('users').findOne(
    { _id: new ObjectId(userId) },
    { projection: { password: 0 } }
  );
  
  if (!user) {
    return error(res, 'User not found', 404);
  }
  
  // Get role-specific profile
  let profile = null;
  
  if (user.role === 'founder') {
    profile = await db.collection('founderProfiles').findOne({
      userId: new ObjectId(userId)
    });
    
    // Get founder's startups
    if (profile && profile.startups && profile.startups.length > 0) {
      const startupIds = profile.startups.map(id => new ObjectId(id));
      const startups = await db.collection('startups')
        .find({ _id: { $in: startupIds } })
        .toArray();
      
      profile.startupDetails = startups;
    }
    
  } else if (user.role === 'investor') {
    profile = await db.collection('investorProfiles').findOne({
      userId: new ObjectId(userId)
    });
  }
  
  return success(res, { 
    user,
    profile
  });
});

// Get platform analytics
const getPlatformAnalytics = asyncHandler(async (req, res) => {
  const db = getDB();
  
  // Get counts
  const founderCount = await db.collection('users').countDocuments({ role: 'founder' });
  const investorCount = await db.collection('users').countDocuments({ role: 'investor' });
  const startupCount = await db.collection('startups').countDocuments();
  const approvedStartupCount = await db.collection('startups').countDocuments({ status: 'approved' });
  const pendingStartupCount = await db.collection('startups').countDocuments({ status: 'pending' });
  
  // Calculate total investment amount
  const startups = await db.collection('startups').find().toArray();
  let totalInvestmentAmount = 0;
  
  startups.forEach(startup => {
    if (startup.investors) {
      startup.investors.forEach(investor => {
        if (investor.status === 'accepted') {
          totalInvestmentAmount += investor.amountOffered;
        }
      });
    }
  });
  
  // Calculate platform equity value
  let totalPlatformEquity = 0;
  
  startups.forEach(startup => {
    if (startup.status === 'approved') {
      totalPlatformEquity += startup.platformEquity;
    }
  });
  
  // Get recent activities
  const recentActivities = await db.collection('startups')
    .find()
    .sort({ updatedAt: -1 })
    .limit(10)
    .project({
      name: 1,
      status: 1,
      updatedAt: 1,
      founderId: 1
    })
    .toArray();
  
  // Get top industries
  const industries = {};
  startups.forEach(startup => {
    if (!industries[startup.industry]) {
      industries[startup.industry] = 0;
    }
    industries[startup.industry]++;
  });
  
  const topIndustries = Object.keys(industries)
    .map(key => ({ name: key, count: industries[key] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  
  return success(res, {
    analytics: {
      counts: {
        founders: founderCount,
        investors: investorCount,
        startups: startupCount,
        approvedStartups: approvedStartupCount,
        pendingStartups: pendingStartupCount
      },
      financial: {
        totalInvestmentAmount,
        totalPlatformEquity
      },
      topIndustries,
      recentActivities
    }
  });
});

// Get detailed platform stats
const getPlatformStats = asyncHandler(async (req, res) => {
  const db = getDB();
  
  // Most active industries
  const startups = await db.collection('startups').find().toArray();
  
  const industriesCount = {};
  startups.forEach(startup => {
    if (!industries[startup.industry]) {
      industries[startup.industry] = 0;
    }
    industries[startup.industry]++;
  });
  
  const industries = Object.keys(industriesCount)
    .map(key => ({ name: key, count: industriesCount[key] }))
    .sort((a, b) => b.count - a.count);
  
  // User growth by month
  const users = await db.collection('users').find().toArray();
  
  const usersByMonth = {};
  users.forEach(user => {
    const date = new Date(user.createdAt);
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!usersByMonth[month]) {
      usersByMonth[month] = { founders: 0, investors: 0 };
    }
    
    if (user.role === 'founder') {
      usersByMonth[month].founders++;
    } else if (user.role === 'investor') {
      usersByMonth[month].investors++;
    }
  });
  
  const growthData = Object.keys(usersByMonth).sort().map(month => ({
    month,
    founders: usersByMonth[month].founders,
    investors: usersByMonth[month].investors,
    total: usersByMonth[month].founders + usersByMonth[month].investors
  }));
  
  // Investment data by month
  const investmentsByMonth = {};
  
  startups.forEach(startup => {
    if (startup.investors) {
      startup.investors.forEach(investor => {
        if (investor.status === 'accepted' && investor.acceptedAt) {
          const date = new Date(investor.acceptedAt);
          const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          
          if (!investmentsByMonth[month]) {
            investmentsByMonth[month] = 0;
          }
          
          investmentsByMonth[month] += investor.amountOffered;
        }
      });
    }
  });
  
  const investmentData = Object.keys(investmentsByMonth).sort().map(month => ({
    month,
    amount: investmentsByMonth[month]
  }));
  
  return success(res, {
    stats: {
      industries,
      growthData,
      investmentData
    }
  });
});

module.exports = {
  getAllStartups,
  getStartupDetails,
  reviewStartupApplication,
  getAllUsers,
  getUserDetails,
  getPlatformAnalytics,
  getPlatformStats
};