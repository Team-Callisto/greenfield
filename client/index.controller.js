angular.module('app.button',[])

.controller('superButton', ['$scope', '$rootScope', '$q', '$http', 'AuthService', '$location', 
	function($scope, $rootScope, $q, $http, AuthService, $location) {
  $rootScope.loginButtonFunc = function() {
    $scope.loginButton = true;
  }
  $rootScope.signupButtonFunc = function() {
    $scope.signupButton = true;
  }
  $rootScope.logoutButtonFunc = function() {
    $scope.logoutButton = true;
  }
  $scope.logout = function() {
  	$scope.loginButton = false;
  	$scope.signupButton = false;
  	$scope.logoutButton = false;
  	AuthService.logout()
  	.then(function () {
  		$location.path('/login');
  	});
  };
}]);