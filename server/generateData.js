var Log = require('./logData/log-data.model.js');
var db = require('./server.js');
var moment = require('moment');

var generateData = function() {
  var levels = [2, 1, 0, -1, -2];
  var numDays = 45;
  var startDate = moment(new Date(2017, 4, 8, 8));
  var numHours = 12;

  for (let i = 0; i < numDays; i++) {
    for (let j = 0; j < numHours; j++) {
      console.log('i,j', i, j);
      var newLog = new Log({
        username: 'Callisto',
        level: levels[Math.floor(Math.random() * levels.length)],
        time: startDate.add(1, 'hours').toDate()
      })
      newLog.save(function(err) {
        if (err) {
          console.log('Error generating data');
        }
        console.log('New log created!');
      })
    }
    // Where is extra single log coming from?
    startDate = moment(startDate.add(1, 'days').set('hour', 8));
    console.log('new startdate is', startDate);
  }
}

generateData();
