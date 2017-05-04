var request = require('request');

var accountSid = 'ACa801ed88b159c5a2765254041e70c7f1';
var authToken = 'a2c016d277659b7bb9283232324bd35f';

var client = require('twilio')(accountSid, authToken);


module.exports = {
  sendText : function(request,response,next) {
    console.log('at server file listening for post requests to /text')

    var options = client.messages.create({
            to: "+16318355557",
            from: "+16319047332",
            body: "Hello, phone",
        }, function(err, message) {
            console.log(message.sid);
        });


    request(options,function(err,res,body){
      if(err) return console.log(err);
      res.send(body);
    });
  }
}
