var request = require('request');

var accountSid = 'ACa801ed88b159c5a2765254041e70c7f1';
var authToken = 'a2c016d277659b7bb9283232324bd35f';

var client = require('twilio')(accountSid, authToken);


module.exports = {
  sendText : function(request,response,next) {
    console.log('at server file listening for post requests to /text');
    console.log(request);
    var options = client.messages.create({
            to: request.body.phoneNumber,
            from: "+16319047332",
            body: request.body.message,
        }, function(err, message) {
            console.log(message.sid);
        });



    request(options,function(err,res,body){
      if(err) return console.log(err);
      res.send(body);
    });
  },

  recieveText: function(request,response,next) {
    console.log('at server file listening for posts requests to /text');
    // console.log(request);
    app.post('/recieve', function(req, res) {
    var twiml = new twilio.TwimlResponse();
    twiml.message(function() {
      this.body('How are you feeling?');
    });
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
    });
  }

  //
  //   request(options,function(err,res,body){
  //     if(err) return console.log(err);
  //     res.send(body);
  //   });
  // }

}
