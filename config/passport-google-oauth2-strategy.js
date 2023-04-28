const passport = require('passport');
const googleStretegy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use a new strategy for google login
passport.use(new googleStretegy({

        clientID:"840061643795-r259er80ntf5bj608jljlpceki2d2e50.apps.googleusercontent.com",
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