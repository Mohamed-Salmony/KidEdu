const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// Verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw error;
  }
};

// Generate token for user
const generateUserToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    name: user.name
  };
  return generateToken(payload);
};

module.exports = {
  generateToken,
  verifyToken,
  generateUserToken
};

