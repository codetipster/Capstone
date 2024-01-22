const express = require('express');
const session = require('express-session');
const cors = require('cors');
const reportRoutes = require('./routes/reportRoutes');

const app = express();
// Determine the current environment
const env = process.env.NODE_ENV || 'development';
// Load the appropriate configuration for the current environment
const config = require('./config/config')[env];

const corsOptions = {
  origin: 'https://capstone-production-78af.up.railway.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: env === 'production',
    httpOnly: true,
  },
}));
app.use(reportRoutes);

// app.listen(config.app.port, () => {
//   console.log(`Server running on port ${config.app.port}`);
// });

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.app.port, () => {
    console.log(`Server running on port ${config.app.port}`);
  });
}

module.exports = app;
