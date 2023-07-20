const router = require('express').Router();
const User = require('../models');
const Blog = require('../models');


const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes')


router.use('/api',apiRoutes);
router.use('/',homeRoutes);


module.exports = router;
