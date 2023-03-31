module.exports.profile = function(req, res){
    return res.render('user', {
        title:'User Profile',
    });
}

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
module.exports.create = function(req, res){
    //TODO Later
}

//Get the SignIn Data
module.exports.createSession = function(req, res){
    //TODO Later
}

