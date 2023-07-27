const express = require('express');
const session = require('express-session');
const reportRoutes = require('./routes/reportRoutes');
const cors = require('cors');
const app = express();
// Determine the current environment
const env = process.env.NODE_ENV || 'development';
// Load the appropriate configuration for the current environment
const config = require('./config/config')[env];


app.use(cors());
app.use(express.json());
app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: env === 'production' ? true : false, 
    httpOnly: true 
  }
}));
app.use(reportRoutes);
app.listen(config.app.port, () => {
  console.log(`Server running on port ${config.app.port}`);
});
