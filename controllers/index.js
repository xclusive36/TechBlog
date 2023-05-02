const router = require('express').Router();
const apiRoutes = require('./api');
const indexRoutes = require('./indexRoutes');

router.use('/api', apiRoutes);
router.use('/', indexRoutes);

module.exports = router;
