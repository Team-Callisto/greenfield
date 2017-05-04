var Q = require('q');
var Log = require('./log-data.model.js')

var findAllLogs = Q.nbind(Log.find, Log);
var createLog = Q.nbind(Log.create, Log);
var aggregateLogs = Q.nbind(Log.aggregate, Log);

module.exports = {
  //fatch data from database
  allLogs: function (req, res, next) {
    console.log("Hello");
    findAllLogs({})
    .then(function (logs) {
      res.json(logs);
    })
    .fail(function (error) {
      next(error);
    });
  },
  //save data to the table
  newLog: function (req, res, next) {
    console.log(req.body)
    return createLog({
      username: req.body.username,
      level: req.body.level,
      mood: req.body.mood,
      note: req.body.note,
      time: req.body.time
    })
    .fail(function (error) {
      next(error);
    });
  },

  daily: function(req, res, next) {
    // res.send('daily data');
    // Log.aggregate([
    //   {$addFields: { year: {$year: "$time"}}},
    //   {$match:{ year: 2018}}
    // ], function(err, logs) {
    //   console.log(logs);
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     res.send(logs);
    //   }
    // });

    aggregateLogs([
      {
        $addFields: {
          year: { $year: "$time"},
          month: { $month: "$time"},
          week: { $week: "$time" },
          day: { $dayOfMonth: "$time" },
          hour: { $hour: "$time" },
          minute: { $minute: "$time"}
        }
      },
      {
        $match: {
          year: parseInt(req.params.year, 10),
          month: parseInt(req.params.month, 10),
          day: parseInt(req.params.day, 10)
        }
      }
    ])
    .then(function(logs) {
      console.log(logs);
      res.send(logs);
    })
    .fail(function(error) {
      next(error);
    });
  },

  monthly: function(req, res, next) {
    aggregateLogs([
      {
        $addFields: {
          year: { $year: "$time"},
          month: { $month: "$time"},
          week: { $week: "$time" },
          day: { $dayOfMonth: "$time" },
          hour: { $hour: "$time" },
          minute: { $minute: "$time"}
        }
      },
      {
        $match: {
          year: parseInt(req.params.year, 10),
          month: parseInt(req.params.month, 10),
        }
      }
    ])
    .then(function(logs) {
      console.log(logs);
      res.send(logs);
    })
    .fail(function(error) {
      next(error);
    });
  }
}

