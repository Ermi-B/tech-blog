const router = require('express').Router();

const userRoutes = require('./userRoutes')
const blogRoutes = require('./blogRoutes');

router.use('/blog',blogRoutes);
router.use('/user',userRoutes);

module.exports = router;