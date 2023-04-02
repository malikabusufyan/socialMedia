const User = require('../models/user');
module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title:'User Profile',
    });
}

//Render Router for SignUp 

module.exports.signUp = function(req ,res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render ('user_sign_up', {
        title: 'Codeial | Sign Up'
    })
}

//Render Router for SignIn

module.exports.signIn = function(req ,res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
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
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

//Sign_out or Destroying the Session
// module.exports.destroySession = function(req, res){
//     req.logout();
//     return res.redirect('/');
// }
module.exports.destroySession = function(req, res){
    req.logout(function(err){
        if(err){
            console.log('Error in destroying session', err);
            return res.redirect('/');
        }
        return res.redirect('/');
    });
}