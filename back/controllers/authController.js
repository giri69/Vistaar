const bcrypt = require('bcryptjs');
const validator = require('validator');
const { ObjectId } = require('mongodb');
const { getDB } = require('../config/db');
const { generateToken } = require('../config/jwt');
const { asyncHandler } = require('../utils/errorHandler');
const { success, error } = require('../utils/responseHandler');

// Register user
const register = asyncHandler(async (req, res) => {
  const db = getDB();
  const { 
    name, 
    email, 
    password, 
    role, 
    cibilScore,
    bio,
    skills,
    expertise,
    connections,
    experience,
    education,
    achievements,
    socialLinks,
    investmentInterests
  } = req.body;
  
  // Validate input
  if (!name || !email || !password || !role) {
    return error(res, 'Please provide all required fields', 400);
  }
  
  // Validate email
  if (!validator.isEmail(email)) {
    return error(res, 'Please provide a valid email', 400);
  }
  
  // Validate password length
  if (password.length < 6) {
    return error(res, 'Password must be at least 6 characters', 400);
  }
  
  // Check if email already exists
  const existingUser = await db.collection('users').findOne({ email });
  if (existingUser) {
    return error(res, 'Email already in use', 400);
  }
  
  // Validate role
  const validRoles = ['founder', 'investor', 'admin'];
  if (!validRoles.includes(role)) {
    return error(res, 'Invalid role. Must be founder, investor, or admin', 400);
  }
  
  // Check CIBIL score for investors
  if (role === 'investor' && (!cibilScore || cibilScore < 700)) {
    return error(res, 'Investors must have a CIBIL score of at least 700', 400);
  }
  
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  // Create user object
  const newUser = {
    name,
    email,
    password: hashedPassword,
    role,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  // Add role-specific data
  if (role === 'investor') {
    newUser.cibilScore = cibilScore;
    newUser.investmentsMade = [];
  } else if (role === 'founder') {
    newUser.startups = [];
  }
  
  // Insert user into database
  const result = await db.collection('users').insertOne(newUser);
  
  // Create user profile collection based on role
  if (role === 'investor') {
    await db.collection('investorProfiles').insertOne({
      userId: result.insertedId,
      name,
      email,
      bio: bio || '',
      expertise: expertise || [],
      connections: connections || [],
      investmentInterests: investmentInterests || [],
      cibilScore,
      investmentsMade: [],
      interestedStartups: [],
      socialLinks: socialLinks || {},
      createdAt: new Date(),
      updatedAt: new Date()
    });
  } else if (role === 'founder') {
    await db.collection('founderProfiles').insertOne({
      userId: result.insertedId,
      name,
      email,
      bio: bio || '',
      skills: skills || [],
      experience: experience || [],
      education: education || [],
      achievements: achievements || [],
      socialLinks: socialLinks || {},
      startups: [],
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
  
  // Generate JWT token
  const token = generateToken(result.insertedId.toString(), role);
  
  // Remove password from response
  const user = {...newUser, _id: result.insertedId};
  delete user.password;
  
  return success(res, { user, token }, 201);
});

// Login user
const login = asyncHandler(async (req, res) => {
  const db = getDB();
  const { email, password } = req.body;
  
  // Validate input
  if (!email || !password) {
    return error(res, 'Please provide email and password', 400);
  }
  
  // Find user by email
  const user = await db.collection('users').findOne({ email });
  
  // Check if user exists
  if (!user) {
    return error(res, 'Invalid credentials', 401);
  }
  
  // Check if password matches
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return error(res, 'Invalid credentials', 401);
  }
  
  // Generate JWT token
  const token = generateToken(user._id.toString(), user.role);
  
  // Remove password from response
  const userData = {...user};
  delete userData.password;
  
  return success(res, { user: userData, token });
});

// Get current user
const getCurrentUser = asyncHandler(async (req, res) => {
  const db = getDB();
  
  // Get user from database with fresh data
  const user = await db.collection('users').findOne({ _id: new ObjectId(req.user.id) });
  
  if (!user) {
    return error(res, 'User not found', 404);
  }
  
  // Get user profile based on role
  let profile = null;
  
  if (user.role === 'founder') {
    profile = await db.collection('founderProfiles').findOne({
      userId: new ObjectId(req.user.id)
    });
  } else if (user.role === 'investor') {
    profile = await db.collection('investorProfiles').findOne({
      userId: new ObjectId(req.user.id)
    });
  }
  
  // Remove password from response
  const userData = {...user};
  delete userData.password;
  
  return success(res, { 
    user: userData,
    profile
  });
});

// Update password
const updatePassword = asyncHandler(async (req, res) => {
  const db = getDB();
  const { currentPassword, newPassword } = req.body;
  
  // Validate input
  if (!currentPassword || !newPassword) {
    return error(res, 'Please provide current and new password', 400);
  }
  
  // Validate new password length
  if (newPassword.length < 6) {
    return error(res, 'Password must be at least 6 characters', 400);
  }
  
  // Get user from database
  const user = await db.collection('users').findOne({ _id: new ObjectId(req.user.id) });
  
  if (!user) {
    return error(res, 'User not found', 404);
  }
  
  // Check if current password matches
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return error(res, 'Current password is incorrect', 401);
  }
  
  // Hash new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  
  // Update password
  await db.collection('users').updateOne(
    { _id: new ObjectId(req.user.id) },
    { 
      $set: { 
        password: hashedPassword,
        updatedAt: new Date()
      } 
    }
  );
  
  return success(res, { message: 'Password updated successfully' });
});

module.exports = {
  register,
  login,
  getCurrentUser,
  updatePassword
};