const express = require('express');
const app = express();
const port=8000;
//Use of express Layout
const expressLayouts = require('express-ejs-layouts');

//use of static Files
app.use(express.static('./assets'));

app.use(expressLayouts)

//Extract of CSS links and Scripts Tag and put them at the head and bottom of the file
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//Use express router
app.use('/', require('./routes/index'));

//setup the view Engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){

    if (err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is Running Perfectly: ${port}`);
});
