angular.module('app.home',['ngMaterial'])
//may seperate controller and factory to adhere to the style guide

// .factory("postToServerFactory",function($scope,$http){
//   $scope.postToServer = function(){
//     $http({
//       method:"POST",
//       url: "/db",
//       data : {
//         'user': $scope.options.user,
//         'time': $scope.options.time,
//         'level': $scope.options.level,
//         'mood': $scope.options.mood,
//         'note' : $scope.options.note
//       }
//   }
// })

.controller('homeController', ['$scope', '$http', '$mdDialog', 'AuthService', '$mdToast', function($scope, $http, $mdDialog, AuthService, $mdToast) {
  //Menu controls
  var originatorEv;
    this.openMenu = function($mdMenu, ev) {
      originatorEv = ev;
      $mdMenu.open(ev);
    };

  console.log('tessssssst')
  $scope.options = {
   level : null,
   availableLevels: [2, 1, 0, -1, -2],
   mood : null,
   availableMoods: ['sentiment_very_satisfied', 'sentiment_satisfied', 'sentiment_neutral', 'sentiment_dissatisfied', 'sentiment_very_dissatisfied' ]
 };

  // $scope.options = {
  //    level : null,
  //    availableLevels: [3, 2, 1, 0, -1, -2, -3],
  //    mood : null,
  //    availableMoods: ['sentiment_very_dissatisfied', 'sentiment_dissatisfied', 'sentiment_neutral', 'sentiment_satisfied', 'sentiment_very_satisfied'],
  //    word: null,
  //    words: ['Content', 'So-so', 'Stressed', 'Upset', 'Motivated']
  //  };

  let currDate = new Date();
  $scope.time = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate(), currDate.getHours());


  $scope.submitInput = function() {
    let username = AuthService.getUser();
    console.log("My username is: ", username);
    //let username = $scope.username;
    let level;
    let mood = $scope.options.mood;
    let time = $scope.time;

    for (let i = 0; i < mood.length; i++) {
      if (mood === $scope.options.availableMoods[i]) {
        level = parseInt($scope.options.availableLevels[i], 10);
      }
    }

    console.log('username', username);
    console.log('level', level);
    console.log(typeof level);
    // console.log('mood', mood);
    // console.log(typeof mood)
    console.log('time is', time);

    $http({
      method: 'POST',
      url: '/db',
      data: {
        username: username,
        level: level,
        time: time
      }
    })
    .then(function(resp) {
      console.log(resp.data);
      return resp.data;
    });
  }
  originatorEv = null;
  // $scope.submitInput = postToServerFactory.postToServer();

  // Toasts
var last = {
    bottom: false,
    top: true,
    left: false,
    right: true
  };

  $scope.toastPosition = angular.extend({},last);

  $scope.getToastPosition = function() {
    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };

  $scope.showSimpleToast = function() {
    var pinTo = $scope.getToastPosition();

    $mdToast.show(
      $mdToast.simple()
        .textContent('Thanks for logging!')
        .position(pinTo )
        .hideDelay(3000)
    );
  };
 }])
