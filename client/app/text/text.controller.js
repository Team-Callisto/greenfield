angular.module('app.text',[])
.controller("textController",function($scope,$http){
 $scope.message = "";
 $scope.phoneNumber = "";
 $scope.displayMessage = [];
 $scope.sendText = () => {
   $scope.displayMessage.push('Me:' + $scope.message);
   let buttonClicked = false;

   $http({
     method: "POST",
     url: "/message",
     data: {
       message : $scope.message,
       phoneNumber : $scope.phoneNumber
     }
   })
   .then(function(response){
     if(buttonClicked === false){
       $scope.displayMessage.push("MoodyBot: " + response.data);
     }
       buttonClicked = true;
   })

 }

//will eventually be split into seperate controllers/factories
 $scope.saveMessage = () => {
   $http({
     method: "GET",
     url: "/text"
   }).then((response) => response.status())
 }
})
