var app = angular.module('myApp.userInput',[])
//may seperate controller and factory to adhere to the style guide


.factory("postToServerFactory",function($scope,$http){
  $scope.postToServer = function(){
    $http({
      method:"POST",
      url: "/db",
      data : {
        'user': $scope.userInput.user,
        'time': $scope.userInput.time,
        'level': $scope.userInput.level,
        'mood': $scope.userInput.mood,
        'note' : $scope.userInput.note
      }

  }

});

.controller("submitController",function($scope,$http,postToServerFactory){
   $scope.userInput = {};
   
   $scope.submitInput = postToServerFactory.postToServer();
 })
