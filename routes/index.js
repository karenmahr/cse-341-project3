const router = require('express').Router();

router.use('/api-docs', require('./swagger'));

router.use('/music', require('./music'));
router.use('/artists', require('./artists'));

module.exports = router;