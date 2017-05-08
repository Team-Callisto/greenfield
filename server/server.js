var mongoose = require('mongoose');
var express = require('express');
var request = require('request');
var app = express();

//server and DB connection
mongoose.connect('mongodb://localhost:27017/greenfieldTest01');
mongoose.Promise = global.Promise;
var server = mongoose.connection;

server.on('error', console.error.bind(console, 'connection error:'));
server.once('open', function () {
  console.log('Mongodb connection open');
});

//require routes
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);


app.listen(8888)
console.log('Server is working and Listening on port 8888...');

module.exports = server;