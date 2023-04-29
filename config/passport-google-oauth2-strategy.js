const passport = require('passport');
const googleStretegy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use a new strategy for google login
passport.use(new googleStretegy({

        clientID:"315988455411-2p0c2d8hmb1hhkoql4g2h449op7g0lg8.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback",
    },async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await User.findOne({ email: profile.emails[0].value });
            console.log(profile);

            if (user) {
            // if found, set this user as req.user
            return done(null, user);
            } else {
            // if not found, create the user and set it a new signUp user
            const newUser = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            });
            return done(null, newUser);
            }
        } catch (err) {
            console.log('error in google strategy-passport', err);
            return done(err);
        }
    }
));

module.exports = passport;