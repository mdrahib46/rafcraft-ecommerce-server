const passport = require('passport');
const { genarateToken } = require('../lib/jwt');
const GoogleStrategy = require('passport-google-oauth20').Strategy;;
const _ = require('lodash');
require('dotenv').config();

const User = require('../models/user');


const strategy = new GoogleStrategy ({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/api/v1/auth/google/redirect"
}, async (accessToken, refreshToken, profile, cb) => {
    const { id } = profile;
    const { email, picture, family_name: lastName, given_name: firstName } = profile._json;
    
    // check is user is exist or not
    let user = await User.findOne({email: email, googleId: id});
    if (user) {
        const token = await genarateToken({id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName});
        const response = {
            user: {id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName},
            token: token
        }

        cb(null, response);
    } else {
        user = new User({email, firstName, lastName, googleId: id, picture});
        await user.save();
        const token = await genarateToken({id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName});
        const response = {
            user: {id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName},
            token: token
        }

        cb(null, response);
    }

})

passport.use(strategy);