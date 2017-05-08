angular.module('app.login', [])

.controller('loginController', ['$scope', '$location', '$rootScope', 'AuthService', function($scope, $location, $rootScope, AuthService) {
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
      //hide login button and signup button when login successfully
      $rootScope.loginButtonFunc();
      $rootScope.signupButtonFunc();
      $rootScope.logoutButtonFunc();
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
