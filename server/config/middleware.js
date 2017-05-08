var bodyParser = require("body-parser");
var morgan = require('morgan');
var User = require('../userData/user-data.model.js');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var hash = require('bcrypt-nodejs');
var path = require('path');
var passport = require('passport');
var localStrategy = require('passport-local' ).Strategy;

module.exports = function (app, express) {
	app.use(morgan('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(express.static(__dirname + '/../../client'));
	app.use(cookieParser());
	app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(express.static(path.join(__dirname, 'public')));

	// configure passport
	passport.use(new localStrategy(User.authenticate()));
	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());
}
