angular.module('app.login', [])

.controller('loginController', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService) {
  
  $scope.login = function () {

  	//initial values
  	$scope.error = false;
  	$scope.disabled = true;

  	//call login from service
  	AuthService.login($scope.user.username, $scope.user.password)

  	//handle success
  	.then(function () {
  		$location.path('/');
  		$scope.disabled = false;
  		$scope.user = {};
  	})
  	//handle error
  	.catch(function() {
  		$scope.error = true;
      $scope.disabled = false;
  		$scope.errorMessage = "I'm sorry, your username or password may not currect";
  		$scope.user = {};
  	});
  };
}]);
