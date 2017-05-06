angular.module('app.data',[])

.controller("dataController",['$scope', '$http', 'AuthService', function($scope, $http, AuthService) {

  // current time generator
  let currTime = new Date();
  $scope.yearToSearch = currTime.getFullYear();
  $scope.monthToSearch = currTime.getMonth();
  $scope.dayToSearch = currTime.getDate();

  // angular-charts data
  $scope.labels;
  $scope.data;
  $scope.series = ['Level'];
  $scope.onClick = function (points, evt) {
   console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
  $scope.width = window.innerWidth * 0.7;
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

  // JS Month is 0-11, MongoDB Month is 1-12
  // Need to add one month to query Mongo
  $scope.displayDaily = function() {

    $scope.selectedData = "This Day's Data";

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
      // $scope.labels = resp.data.map(x => x.time.slice(11,16));
      // $scope.data = resp.data.map(y => y.level);

      //temp hard coded data
      $scope.labels = ['8:00', '9:00', '10:00', '11:00', '12:00pm', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00'];
      $scope.data = [0,1,2,2,1,0,-2,-3,1,1,0,1,3,2,1];
    });
  }

  $scope.displayWeekly = function() {
    $scope.selectedData = "This Week's Data";
    let year = $scope.yearToSearch;
    let month = $scope.monthToSearch + 1;
    let day = $scope.dayToSearch;
    $http({
      method: 'GET',
      url: `/data/${year}/${month}/${day}`,
      // Doing below uses url: /data/?year=2017
      // params: { year: $scope.yearToSearch}
    })
    .then(function(resp) {
      console.log('resp is', resp.data);
      $scope.tableWeekly = resp.data;
      // $scope.labels = resp.data.map(x => x.time.slice(11,16));
      // $scope.data = resp.data.map(y => y.level);

      //temp hard coded data
      $scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      $scope.data = [-2,-1,0,1,2,3,3];
    });
  }

  $scope.displayMonthly = function() {

    $scope.selectedData = "This Month's Data";

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
      // let logs = resp.data.filter(elem => elem.day === 2)
      // .map(elem => elem.time);

      // Grouping by week on server, requires underscore
      // let test = _.groupBy(resp.data, elem => elem.week);
      // console.log(test);
      //
      // for (var week in test) {
      //   if (test.hasOwnProperty(week)) {
      //     console.log(`Week ${week}`);
      //     console.log(test[week]);
      //   } else {
      //     console.log('uhh');
      //   }
      // }
      // $scope.tableMonthly = test;

      $scope.tableMonthly = resp.data;

      //temp hard coded data
      $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      $scope.data = [0,2,3,2,0,-3,1,2,2,1,2,-3];
    });
  }

  //displays every day data forever
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
      console.log('this is the daily averages',resp.data);
      $scope.dailyAverages = resp.data;
      // $scope.labels
      // $scope.data = resp.data.map(y => Math.round(y.averageLevel));
    })
  }

  //displays every week data forever
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
      console.log('this is the weekly averages', resp.data);
      $scope.weeklyAverages = resp.data;
      // $scope.labels
      // $scope.data
    })
  }

  $scope.displayDailyGraphs = function() {
    var username = AuthService.getUser();
    console.log("My username is: ", username);
    let year = $scope.yearToSearch;
    $http({
      method: 'POST',
      url: `data/average/level/daily/${year}`,
      data: {username: username}
    })
    .then(function(resp) {
      // console.log(resp.data);
      let final = [];
      let weekly = _.groupBy(resp.data, elem => elem._id.week);
      for (var week in weekly) {
        let weekLevels = _.pluck(weekly[week], 'averageLevel');
        console.log('weekLevels', weekLevels);
        // let day = weekly[week];
        // console.log('day is', day);
        // let date = new Date(day._id.year, day._id.month, day._id.day);
        weekly[week]['weeklyLevels'] = [weekLevels];
        // weekly['weeklyLevels'] = weekLevels;
      }
      $scope.dailyGraphs = resp.data;
      console.log('dailyGraphs', weekly);
    })
  }

  // TEMP: display db data
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

}])
