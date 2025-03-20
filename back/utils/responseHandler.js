// Success response
const success = (res, data, statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      data
    });
  };
  
  // Error response
  const error = (res, message, statusCode = 400) => {
    return res.status(statusCode).json({
      success: false,
      message
    });
  };
  
  module.exports = { success, error };