const User = require('../models/user');

//Render the profile 
module.exports.profile = async function(req, res){
    try {
        if (req.cookies.user_id){
            const user = await User.findById(req.cookies.user_id).exec();
            if (user){
                return res.render('user_profile',{
                    title: 'User Profile',
                    user: user
                });
            } else {
                return res.redirect('/users/sign-in');
            }
        } else {
            return res.redirect('/users/sign-in');
        }
    } catch (err) {
        console.log('error in rendering user profile', err);
        return res.status(500).send('Internal Server Error');
    }
};


//Render Router for SignUp 
module.exports.signUp = function(req ,res){
    return res.render ('user_sign_up', {
        title: 'Codeial | Sign Up'
    })
}

//Render Router for SignIn
module.exports.signIn = function(req ,res){
    return res.render ('user_sign_in', {
        title: 'Codeial | Sign In'
    })
}

//Get the SignUp Data
module.exports.create = async function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    try {
        const user = await User.findOne({email: req.body.email});
        if (!user){
            const newUser = await User.create(req.body);
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('error in finding/creating the user for signup', err);
        return res.status(500).send('Internal Server Error');
    }
};

//Get the SignIn Data
module.exports.createSession = async function(req, res){
    try {
        //Steps to Authenticate
        //find the User
        const user = await User.findOne({ email: req.body.email }).exec();
        
        //handle user found
        if (user){
            //handle if password doesn't match
            if (user.password !== req.body.password){
                return res.redirect('back');
            }
            //handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        } else {
            //handle user not found
            return res.redirect('back');
        }
    } catch (err) {
        console.log('error in finding the user for signup', err);
        return res.status(500).send('Internal Server Error');
    }
};

// Handle signout
module.exports.signOut = function(req, res){
    res.clearCookie('user_id');
    return res.redirect('/users/sign-in');
}