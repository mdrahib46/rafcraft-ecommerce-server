const { signup, signin } = require('../../controllers/authContoller');
const router = require('express').Router();
const passport = require('passport');
require('../../config/authGoogleConfig');


// routes
router.post('/signup', signup);
router.post('/signin', signin);
// Social Login
router.route('/google').get(passport.authenticate("google", { scope: ['profile', 'email'] }));
router.route('/google/redirect')
    .get(passport.authenticate("google", { session: false }), (req, res) => {
        return res.send(req.user);
    })

module.exports = router;