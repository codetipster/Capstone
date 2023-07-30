const express = require('express');
const session = require('express-session');
const reportRoutes = require('./routes/reportRoutes');
const cors = require('cors');
const path = require('path'); // Add this line

const app = express();

const env = process.env.NODE_ENV || 'development';
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

// Add these lines to serve your static files
if (env === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(config.app.port, () => {
  console.log(`Server running on port ${config.app.port}`);
});
