var mongoose = require('mongoose');

var textDataSchema = new mongoose.Schema({
  phoneNumber: String,
  message: String
});

module.exports = mongoose.model('textMsg', textDataSchema);
