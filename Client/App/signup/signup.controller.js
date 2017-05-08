angular.module('app.signup', [])

.controller('signupController', 
	['$scope','$location', 'AuthService',
	function($scope, $location, AuthService) {
  	
  	$scope.register = function() {

  		//initial values
  		$scope.error = false;
  		$scope.disabled = true;

  		//call register from service
  		AuthService.register($scope.user.name, $scope.user.email, $scope.user.username, $scope.user.password)
  		.then(function () {
  			$location.path('/login');
  			$scope.disabled = false;
  			$scope.user = {};
  		})
  		.catch(function () {
  			$scope.error = true;
  			$scope.errorMessage = "User name is already exist, please try again!";
  			$scope.disabled = false;
  			$scope.user = {};
  		});
  	};
}]);
