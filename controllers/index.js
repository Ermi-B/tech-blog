const router = require('express').Router();
const User = require('../models');
const Blog = require('../models');

const apiRoutes = require('./api');
// const landingRoutes = require('./landingRoutes')


router.use('/api',apiRoutes);

module.exports = router;
