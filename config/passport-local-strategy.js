//Importing Passport and Passport Local
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

//Importing User From Model
const User = require('../models/user');

/*
These are old mongoose version thats why it is not running
FindOne and FindbyID function doesn't take callback function now
so we have to write both the code using then and catch method
//Authentication Using Passport
passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    function(email, password, done){
        //Find a User and establish the identity
        User.findOne({email: email}, function(err, user){
            if (err){
                console.log('Error in Finding the User ---> Passport');
                return done(err);
            }
            if (!user || user.password != password){
                console.log("Invalid Username/Password");
                return done(null, false);
            }
            //Return the User if both the above condition failed
            return done(null, user);
        })
    }
));*/

//Authentication Using Passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
    },
    function(req, email, password, done){
        //Find a User and establish the identity
        User.findOne({email: email})
            .then(user => {
                if (!user || user.password != password){
                    req.flash('error', "Invalid Username/Password");
                    return req.res.redirect('/users/sign-in');
                }
                //Return the User if both the above condition failed
                return done(null, user);
            })
            .catch(err => {
                console.log('Error in Finding the User ---> Passport');
                return done(err);
            });
    }
));

//Serializing the User to decide which key we need to keep in the cookie
passport.serializeUser(function(user, done){
    done(null, user.id);
});

/*
//Deserializing the User from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, done){
        if (err){
            console.log('Error in Finding the User ---> Passport');
            return done(err);
        }
        return done(null, user);
    });
});*/

//Deserializing the User from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id)
        .then(user => {
            return done(null, user);
        })
        .catch(err => {
            console.log('Error in Finding the User ---> Passport');
            return done(err);
        });
});

//Check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    //if the user is signed in passed on the next function request (controller's action)
    if (req.isAuthenticated()){
        return next();
    }
    //if the user is not signed-in
    return res.redirect('/users/sign-in')
}

//Move to the View file once the user got authenticated
passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        //req.user contains the current signed in user session cookie 
        //and we are just sending to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;