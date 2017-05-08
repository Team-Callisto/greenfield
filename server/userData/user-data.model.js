var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserDataSchema = new mongoose.Schema({

	username: String,
	password : String,
	userRealName : String,
	email: String

})

UserDataSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', UserDataSchema);