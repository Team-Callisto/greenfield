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



var accountSid = 'ACa801ed88b159c5a2765254041e70c7f1';
var authToken = 'a2c016d277659b7bb9283232324bd35f';


var client = require('twilio')(accountSid, authToken);




app.post("/text",function(request,response){
  console.log('at server file listening for post requests to /text')

  var options = client.messages.create({
      to: "+16318355557",
      from: "+16319047332",
      body: request.data.message,
  }, function(err, message) {
      console.log(message.sid);
  });


  request(options,(err,res,body) => {
    if(err) return console.log(err);
    res.send(body);
  });
})
