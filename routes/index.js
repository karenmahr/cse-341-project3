const router = require('express').Router();

router.use('/music', require('./music'));

module.exports = router;