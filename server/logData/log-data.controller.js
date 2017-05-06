var Q = require('q');
var Log = require('./log-data.model.js');
var _ = require('underscore');

var findAllLogs = Q.nbind(Log.find, Log);
var createLog = Q.nbind(Log.create, Log);
var aggregateLogs = Q.nbind(Log.aggregate, Log);

module.exports = {
  //fatch data from database
  singleLogs: function (req, res, next) {
    findAllLogs({username: req.body.username})
    .then(function (logs) {
      res.json(logs);
    })
    .fail(function (error) {
      next(error);
    });
  },
  //save data to the table
  newLog: function (req, res, next) {
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
    console.log("Hello: ", req.body.username);
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
          username: req.body.username,
          year: parseInt(req.params.year, 10),
          month: parseInt(req.params.month, 10),
          day: parseInt(req.params.day, 10)
        }
      }
    ])
    .then(function(logs) {
      console.log('daily logs: ', logs);
      res.send(logs);
    })
    .fail(function(error) {
      next(error);
    });
  },

  monthly: function(req, res, next) {
    // aggregateLogs([
    //   {
    //     $group: {
    //       _id: {
    //         year: { $year: "$time" },
    //         month: { $month: "$time" } ,
    //         week: { $week: "$time" },
    //         day: { $dayOfMonth: "$time" },
    //
    //       },
    //       averageLevel: { $avg: "$level" }
    //     }
    //   }
    // ])
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
          username: req.body.username,
          year: parseInt(req.params.year, 10),
          month: parseInt(req.params.month, 10),
        }
      }
    ])
    .then(function(logs) {
      // console.log('logging', logs);
      // let sorted = _.sortBy(logs, elem => -elem.time);
      // let data = _.groupBy(sorted, elem => elem.week);
      //   // log_.groupBy(logs, time => time.week);
      // console.log(data);
      console.log(logs);
      res.send(logs);
    })
    .fail(function(error) {
      next(error);
    });
  },

  dailyAverages: function(req, res, next) {
    aggregateLogs([
      {
        $sort: {
          time: 1
        }
      },
      {
        $addFields: {
          year: { $year: "$time"}
        }
      },
      {
        $match: {
          username: req.body.username,
          year: parseInt(req.params.year, 10)
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$time" },
            month: { $month: "$time" } ,
            week: { $week: "$time" },
            day: { $dayOfMonth: "$time" },

          },
          averageLevel: { $avg: "$level" },
          times: { $push: "$$ROOT"},
          levels: { $push: "$level"}
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

  weeklyAverages: function(req, res, next) {
    aggregateLogs([
      {
        $sort: {
          time: 1
        }
      },
      {
        $addFields: {
          year: { $year: "$time"}
        }
      },
      {
        $match: {
          username: req.body.username,
          year: parseInt(req.params.year, 10)
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$time" },
            month: { $month: "$time" } ,
            week: { $week: "$time" }
          },
          averageLevel: { $avg: "$level" },
          times: { $push: "$$ROOT"},
          // levels: { $push: "$level"}
        }
      },
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
