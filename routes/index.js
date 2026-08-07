const router = require('express').Router();

router.use('/api-docs', require('./swagger'));

router.use('/music', require('./music'));
router.use('/artists', require('./artists'));
router.use('/albums', require('./albums'));
router.use('/tour_dates', require('./tour_dates'));

module.exports = router;