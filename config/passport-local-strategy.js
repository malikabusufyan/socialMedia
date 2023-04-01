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
    usernameField: 'email'
    },
    function(email, password, done){
        //Find a User and establish the identity
        User.findOne({email: email})
            .then(user => {
                if (!user || user.password != password){
                    console.log("Invalid Username/Password");
                    return done(null, false);
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

module.exports = passport;