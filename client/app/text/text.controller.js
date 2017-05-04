angular.module('app.text',[])
.controller("textController",function($scope,$http){
  $scope.message = "";
  $scope.phoneNumber = "";
  $scope.displayMessage = "";
  $scope.sendText = () => {
    $http({
      method: "POST",
      url: "/text",
      data: {
        message : $scope.message,
        phoneNumber : $scope.phoneNumber
      }
    })
    .then(function(response){
      displayMessage = response;
    })
  }
})
