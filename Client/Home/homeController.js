var app = angular.module('myApp',[])
//may seperate controller and factory to adhere to the style guide


.factory("postToServerFactory",function($scope,$http){
  $scope.postToServer = function(){
    $http({
      method:"POST",
      url: "/db",
      data : {
        'user': $scope.options.user,
        'time': $scope.options.time,
        'level': $scope.options.level,
        'mood': $scope.options.mood,
        'note' : $scope.options.note
      }
    }
});

.controller("submitController",function($scope,$http,postToServerFactory){
   $scope.options = {};
   $scope.options.level = [-3,-2,-1,0,1,2,3];
   $scope.options.availableMoods = [‘Content’, ‘So-so’, ‘Stressed’, ‘Upset’, ‘Motivated’];
   $scope.submitInput = postToServerFactory.postToServer();
 })
