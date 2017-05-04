var mongoose = require('mongoose');

var LogDataSchema = new mongoose.Schema({
  username: String,
  level: Number,
  mood: String,
  note: String,
  time: Date
});

module.exports = mongoose.model('Log', LogDataSchema);
