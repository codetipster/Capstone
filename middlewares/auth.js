require('dotenv').config();

// middleware/auth.js
const auth = (req, res, next) => {
    if (!req.session.token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
  
    // Attach the token to the request object for easy access in downstream middleware/route handlers
    req.token = req.session.token;
  
    // Proceed to the next middleware/route handler
    next();
  };
  
  module.exports = auth;
  