var express = require('express');
var app = express();
//var http = require('http');
//var request = require("request");
var bodyParser = require("body-parser");//Maybe I do not need this line.

var db = require('./db.js');//check this path!!!!!
var logDataModel = require('./logDataModel.js');//check this path!!!!!
var logDataController = require('./logDataController.js')//check this path!!!!!

//middle ware
app.use(bodyParser.json());//Maybe I do not need this line
app.use(express.static(__dirname + '/client'));//check this path!!!!!!

app.post('/db', logDataController.newLog);
app.get('/', logDataController.allLogs);

//if type other address, console log error messages
app.get("*", function(req, res) {
	res.end("Error 404! HAHAHAHAHA, please Type: loclhost:8888");
})

module.exports = app;
