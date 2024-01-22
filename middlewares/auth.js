require('dotenv').config();

// middleware/auth.js
// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://capstone-production-78af.up.railway.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  // Attach the token to the request object for easy access in downstream middleware/route handlers
  req.token = token;

  // Proceed to the next middleware/route handler
  next();
};

module.exports = auth;
