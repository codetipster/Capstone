require('dotenv').config();

// middleware/auth.js
const auth = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  // Attach the token to the request object for easy access in downstream middleware/route handlers
  req.token = token;

  // Proceed to the next middleware/route handler
  next();
};

module.exports = auth;
  