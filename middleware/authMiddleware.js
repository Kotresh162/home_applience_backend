const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
  console.log('🔍 Verifying token...');

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    console.error('🔴 No token provided');
    return res.status(401).json({ message: 'Unauthorized. No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('🟢 Decoded Token:', decoded);

    const user = await User.findById(decoded.id).select('-password');
    console.log('🟢 User found:', user);


    if (!user) {
      console.error('🔴 User not found:', decoded.id);
      console.log('🔴 Token verification failed.');

      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('🔥 Invalid token error:', error.message);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { protect };
