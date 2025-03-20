// Admin middleware
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: 'Access denied: Admin only'
      });
    }
  };
  
  // Founder middleware
  const founderOnly = (req, res, next) => {
    if (req.user && req.user.role === 'founder') {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: 'Access denied: Founder only'
      });
    }
  };
  
  // Investor middleware
  const investorOnly = (req, res, next) => {
    if (req.user && req.user.role === 'investor') {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: 'Access denied: Investor only'
      });
    }
  };
  
  // Founder or Admin middleware
  const founderOrAdmin = (req, res, next) => {
    if (req.user && (req.user.role === 'founder' || req.user.role === 'admin')) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: 'Access denied: Founder or Admin only'
      });
    }
  };
  
  // Investor or Admin middleware
  const investorOrAdmin = (req, res, next) => {
    if (req.user && (req.user.role === 'investor' || req.user.role === 'admin')) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: 'Access denied: Investor or Admin only'
      });
    }
  };
  
  module.exports = {
    adminOnly,
    founderOnly,
    investorOnly,
    founderOrAdmin,
    investorOrAdmin
  };