const router = require('express').Router();
const passport = require('passport');
router.use('/api-docs', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    if (req.session.user !== undefined) {
        res.send(`Logged in as ${req.session.user.displayName || req.session.user.username}`);
    } else {
        res.send('Logged out');
    }
});
router.get('/login', passport.authenticate('github'), (req, res) => { });

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

router.use('/music', require('./music'));
router.use('/artists', require('./artists'));
router.use('/albums', require('./albums'));
router.use('/tour_dates', require('./tour_dates'));

module.exports = router;