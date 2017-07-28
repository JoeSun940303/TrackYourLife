var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port     = process.env.PORT || 8080;
var passport = require('passport');
var flash    = require('connect-flash');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();
var configDB = require('./database.js');


mongoose.connect(configDB.url); // connect to our database
//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));
//app.use(express.bodyParser());

require('./passport')(passport); // pass passport for configuration

//app.use(express.logger('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// load our routes and pass in our app and fully configured passport
require('./routes.js')(app, passport,path);

// Load "meal.js" to store the dish data into database
require('./meal.js')(app);

// Listen the port of local machine
app.listen(port, function() {
  console.log('Server running ');
});
