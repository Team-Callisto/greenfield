angular.module('app.data',[])

.controller("dataController",['$scope', '$http', 'AuthService', 'moment', function($scope, $http, AuthService, moment) {

   //bar chart data
   $scope.barLabels = [-3,-2,-1,0,1,2,3];
   $scope.barData = [
     [20, 0, 0, 10, 20 , 10, 40 ]
   ];

   //current date generator
   let currTime = new Date();
   $scope.yearToSearch = currTime.getFullYear();
   $scope.monthToSearch = currTime.getMonth();
   $scope.dayToSearch = currTime.getDate();

   //angular charts options
   $scope.onClick = function (points, evt) {
     console.log(points, evt);
   };
   $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
   $scope.width = window.innerWidth * 0.5;
   $scope.doughnutWidth = window.innerWidth * 0.35;
   $scope.options = {
     responsive: false,
     maintainAspectRatio: false,
     scales: {
       yAxes: [
         {
           id: 'y-axis-1',
           type: 'linear',
           display: true,
           position: 'left'
         }
       ]
     }
   };

  // Overview of how displaying functions work
  // Angular charts takes in labels and data
  // To autopopulate those charts, we pass in
  // the labels, 'justHours/Days' and
  // data, 'justLevels'
  //
  // justLabel is an individual array, as such
  // ['8PM, 9PM'] and justLevels, ['2', '-1']
  // Because each one needs to be an individual
  // array, also need to sort, so that values
  // correspond with the other. Without sorting,
  // would need an alternate method of matching
  // the hours/days/week with levels
  //
  // Note that a JavaScript Date() month is from
  // 0 - 11, while a Mongo date month is from 1-12
  // which is why we subtract 1 when creating a JS Date
  // and vice-versa

  // Therefore, we sort so that the labels and level match up
  // and to create a descending/ascending format when
  // displaying the data

  // For more info, inspect the object property that is being
  // returned

  // Similar to 'displayDailyGraphs', with filter function
  // to get the current day (today)
  // Should be refactored
  $scope.displayTodayGraphs = function() {
    $scope.todayTitle = "Today's Data";
    $scope.hideTodayGraph = false;
    $scope.hideDayGraph = true;
    $scope.hideWeekGraph = true;
    $scope.hideMonthGraph = true;
    var username = AuthService.getUser();
    console.log("My username is: ", username);
    let year = $scope.yearToSearch;

    $http({
      method: 'POST',
      url: `data/average/level/daily/${year}`,
      data: { username: username }
    })
    .then(function(resp) {
      let daily = resp.data.sort( (a, b) => {
        let aDate = new Date(a._id.year, a._id.month - 1, a._id.day);
        let bDate = new Date(a._id.year, b._id.month - 1, b._id.day);
        return bDate - aDate;
      });

      for (var dayNum in daily ) {
        let day = daily[dayNum];
        day['day'] = new Date(day._id.year, day._id.month - 1, day._id.day);
        day['justLevels'] = [];
        day['justHours'] = [];

        day.times.forEach(hour => {
          day['justLevels'].push(hour.level);
          day['justHours'].push(moment(hour.time).format('ha'));
        })
      }

      let currDay = daily.filter( day => {
        if (day._id.day === currTime.getDate() && day._id.month === (currTime.getMonth() + 1) && day._id.year === currTime.getFullYear()) {
          return true;
        }
      });

      console.log('todayGraphs', daily);
      $scope.todayGraphs = currDay;
    })
  }

  $scope.displayDailyGraphs = function() {
    $scope.dayTitle = "Daily Data";
    $scope.hideTodayGraph = true;
    $scope.hideDayGraph = false;
    $scope.hideWeekGraph = true;
    $scope.hideMonthGraph = true;
    var username = AuthService.getUser();
    console.log("My username is: ", username);
    let year = $scope.yearToSearch;
    $http({
      method: 'POST',
      url: `data/average/level/daily/${year}`,
      data: { username: username }
    })
    .then(function(resp) {
      let daily = resp.data.sort( (a, b) => {
        let aDate = new Date(a._id.year, a._id.month - 1, a._id.day);
        let bDate = new Date(a._id.year, b._id.month - 1, b._id.day);
        return bDate - aDate;
      });

      for (var dayNum in daily ) {
        let day = daily[dayNum];
        day['day'] = new Date(day._id.year, day._id.month - 1, day._id.day);
        day['justLevels'] = [];
        day['justHours'] = [];

        day.times.forEach(hour => {
          day['justLevels'].push(hour.level);
          day['justHours'].push(moment(hour.time).format('ha'));
        })
      }

      console.log('dailyGraphs', daily);
      $scope.dailyGraphs = daily;
    })
  },

  $scope.displayWeeklyGraphs = function() {
    $scope.weekTitle = "This Week's Data";
    $scope.hideTodayGraph = true;
    $scope.hideDayGraph = true;
    $scope.hideWeekGraph = false;
    $scope.hideMonthGraph = true;
    var username = AuthService.getUser();
    console.log("My username is: ", username);
    let year = $scope.yearToSearch;
    $http({
      method: 'POST',
      url: `data/average/level/daily/${year}`,
      data: { username: username }
    })
    .then(function(resp) {
      let weekly = _.groupBy(resp.data, elem => elem._id.week);
      for (var weekNum in weekly) {
        let week = weekly[weekNum];
        week['weekLevels'] = [];
        week['justLevels'] = [];
        week['justDays'] = [];

        week.forEach(day => {
          // Subtract one from month since JS Data Month is 0 - 11
          let date = new Date(day._id.year, day._id.month - 1, day._id.day);
          week['weekLevels'].push([date, day.averageLevel]);
          let sorted = week['weekLevels'].sort( (a, b) => {
            return a[0] - b[0];
            console.log('a', a);
            console.log('b', b);
          });
          week['weekLevels'] = sorted;
        })

        week['justLevels'] = week['weekLevels'].map(level => level[1]);
        week['justDays'] = week['weekLevels'].map(level => moment(level[0]).format('ddd, MMM Do'));
      }
      console.log('weeklyGraphs', weekly);
      $scope.weeklyGraphs = weekly;
    })
  },

  $scope.displayMonthlyGraphs = function() {
    $scope.monthTitle = "This Month's Data";
    $scope.hideTodayGraph = true;
    $scope.hideDayGraph = true;
    $scope.hideWeekGraph = true;
    $scope.hideMonthGraph = false;
    var username = AuthService.getUser();
    console.log("My username is: ", username);
    let year = $scope.yearToSearch;
    $http({
      method: 'POST',
      url: `data/average/level/weekly/${year}`,
      data: { username: username }
    })
    .then(function(resp) {
      let monthly = _.groupBy(resp.data, elem => elem._id.month);
      for (var monthNum in monthly) {
        let month = monthly[monthNum];
        month['month'] = new Date(month[0]._id.year, month[0]._id.month - 1);
        month['monthLevels'] = [];
        month['justLevels'] = [];
        month['justWeeks'] = [];

        month.forEach(day => {
          // Subtract one from month since JS Data Month is 0 - 11
          // let date = new Date(day._id.year, day._id.month - 1);
          month['monthLevels'].push([day._id.week, day.averageLevel]);
          let sorted = month['monthLevels'].sort( (a, b) => {
            return a[0] - b[0];
            console.log('a', a);
            console.log('b', b);
          });
          month['monthLevels'] = sorted;
        })

        month['justLevels'] = month['monthLevels'].map(level => level[1]);
        month['justWeeks'] = month['monthLevels'].map(level => level[0]);
      }
      console.log('monthlyGraphs', monthly);
      $scope.monthlyGraphs = monthly;
    })
  }

  // **********************************************************
  // Below functions helpful with debugging
  // Not used in production

  // JS Month is 0-11, MongoDB Month is 1-12
  // Need to add one month to query Mongo
  $scope.displayDaily = function() {
    $scope.selectedData = "this day's data";
    var username = AuthService.getUser();
    console.log("My username is: ", username);
    let year = $scope.yearToSearch;
    let month = $scope.monthToSearch + 1;
    let day = $scope.dayToSearch;
    $http({
      method: 'POST',
      url: `/data/${year}/${month}/${day}`,
      // Doing below uses url: /data/?year=2017
      // params: { year: $scope.yearToSearch}
      data: {username: username}
    })
    .then(function(resp) {
      console.log('resp is', resp.data);
      $scope.tableDaily = resp.data;

      //temp hard coded data to test graphs
      $scope.labels = ['8:00', '9:00', '10:00', '11:00', '12:00pm', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00'];
      $scope.data = [0,1,2,2,1,0,-2,-3,1,1,0,1,3,2,1];
    });
  }

  $scope.displayWeekly = function() {
    $scope.selectedData = "this week's data";
    var username = AuthService.getUser();
    console.log("My username is: ", username);
    let year = $scope.yearToSearch;
    let month = $scope.monthToSearch + 1;
    let day = $scope.dayToSearch;
    $http({
      method: 'POST',
      url: `/data/${year}/${month}/${day}`,
      data: {username: username}
    })
    .then(function(resp) {
      console.log('resp is', resp.data);
      $scope.tableDaily = resp.data;

      //temp hard coded data for testing graph
      $scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      $scope.data = [0,-1,0,1,2,3,3];
    });
  }

  $scope.displayMonthly = function() {
    $scope.selectedData = "this month's data";
    var username = AuthService.getUser();
    console.log("My username is: ", username);
    let year = $scope.yearToSearch;
    let month = $scope.monthToSearch + 1;
    let day = $scope.dayToSearch;
    $http({
      method: 'POST',
      url: `/data/${year}/${month}`,
      data: {username: username}
    })
    .then(function(resp) {
      console.log('resp is', resp.data);
      $scope.tableMonthly = resp.data;

      //temp hard coded data to test graphs
      $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      $scope.data = [0,2,3,2,0,-3,1,2,2,1,2,-3];
    });
  }

  $scope.displayTable = function() {
    var username = AuthService.getUser();
    console.log("My username is: ", username);
    $http({
      method: 'POST',
      url: '/data',
      data: {username: username}
    })
    .then(function(resp) {
      $scope.tableGraph = resp.data; // temp, just to display server response
    });
  }

  $scope.displayDailyAverages = function() {
    var username = AuthService.getUser();
    console.log("My username is: ", username);
    let year = $scope.yearToSearch;
    $http({
      method: 'POST',
      url: `data/average/level/daily/${year}`,
      data: {username: username}
    })
    .then(function(resp) {
      console.log(resp.data);
      $scope.dailyAverages = resp.data;
    })
  }

  $scope.displayWeeklyAverages = function() {
    var username = AuthService.getUser();
    console.log("My username is: ", username);
    let year = $scope.yearToSearch;
    $http({
      method: 'POST',
      url: `data/average/level/weekly/${year}`,
      data: {username: username}
    })
    .then(function(resp) {
      console.log(resp.data);
      $scope.weeklyAverages = resp.data;
    })
  }
}])
