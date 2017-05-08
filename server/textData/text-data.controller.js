const request = require('request');
const bodyparser = require('body-parser');

const accountSid = 'ACa801ed88b159c5a2765254041e70c7f1';
const authToken = 'a2c016d277659b7bb9283232324bd35f';

const client = require('twilio')(accountSid, authToken);


module.exports = {
  allMessages : {
    
  },
  sendText:
    function(req, res, next) {
                console.log('at server file listening for post requests to /text');
                console.log(req.body.phoneNumber);
                        let options = client.messages.create({
                            uri: "https://api.twilio.com/2010-04-01/Accounts/ACa801ed88b159c5a2765254041e70c7f1/Messages.json",
                            to: "+" + req.body.phoneNumber,
                            from: "+16319047332",
                            body: req.body.message,
                        }, function(err, message) {
                            if(err) return console.log("error here " + err)
                            // console.log(message.sid);
                        });


                        request(options, function(err, res, body) {
                            if (err) return console.log(err);
                            console.log(body);
                            res.send(body);
                        });
                        console.log(res);
                        res.send(req.body);
                    },


  recieveText: function(req,res){
      let msgFrom = req.body.From;
      let msgBody = req.body.Body;
      exports.allMessages.msgFrom = msgBody;
      res.send(
          `<Response>
            <Message>${msgFrom}. How are you feeling </Message>
          </Response>`
      )}


    }
