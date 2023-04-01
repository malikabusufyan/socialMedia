const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port=8000;
//Use of express Layout
const expressLayouts = require('express-ejs-layouts');
//Accessing Database
const db = require('./config/mongoose');

//Accessign express Session and setting up 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded());
app.use(cookieParser());

//use of static Files
app.use(express.static('./assets'));

app.use(expressLayouts)

//Extract of CSS links and Scripts Tag and put them at the head and bottom of the file
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setup the view Engine
app.set('view engine', 'ejs');
app.set('views', './views');

//Use of Session
app.use(session({
    name:'codeial',
    //TODO before going for the production
    secret:'something',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

//Use express router
app.use('/', require('./routes'));

app.listen(port, function(err){

    if (err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is Running Perfectly: ${port}`);
});
