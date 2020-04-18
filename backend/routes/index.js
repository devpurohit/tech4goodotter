const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const analyticsRoutes = require('./analytics');
const ngoRoutes = require('./ngo');

router.use('/auth', authRoutes);
router.use('/log', analyticsRoutes);
router.use('/ngo', ngoRoutes);

module.exports = router;