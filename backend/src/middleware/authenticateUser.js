const jwt = require('jsonwebtoken');
const User = require('../users/user.model');

exports.authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from 'Authorization' header

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('_id username email'); // Select user details
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    req.user = user; // Attach user to request
    next(); // Proceed to next middleware or controller
  } catch (error) {
    console.error('Authentication error:', error.message);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};
