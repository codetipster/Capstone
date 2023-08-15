// routes/reportRoutes.js
const express = require('express');
const { check } = require('express-validator');
const { authenticate, getReport } = require('../controllers/reportController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/auth', [
  // username must be an email
  check('username').isEmail(),
  // password must be at least 5 chars long
  check('password').isLength({ min: 5 })
], authenticate);

// Protect the /fetch-report route with the auth middleware
router.get('/fetch-report', auth, getReport);

module.exports = router;

