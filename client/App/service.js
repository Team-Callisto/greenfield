angular.module('app').factory('AuthService',
	['$q', '$timeout','$http',
	function($q, $timeout, $http) {
		//create user variable
		var user = null;
		var getUserName = '';

		//return available functions for use in the controllers
		return ({
			isLoggedIn: function () {
				if(user) {
					return true;
				} else {
					return false;
				}
			},
			getUserStatus: function() {
				return user;
			},
			login: function(username, password) {
				//create a new instance of deferred
				var deferred = $q.defer();
				getUserName = username;
				$http.post('/login', {username: username, password: password})
				//handle success
				.then(function (data) {
					if( data.status === 200 && data.status) {
						user = true;
						deferred.resolve();
					} else {
						user = false;
						deferred.reject();
					}
				})
				// handle error
				.catch(function (data) {
					user = false;
					deferred.reject();
				});
				//return promise object
				return deferred.promise;
			},
			logout: function() {
				//create a new instance of deferred
				var deferred = $q.defer();
				//send a get request to the server
				$http.get('/signout')
				//handle success
				.then(function (data) {
					user = false;
					deferred.resolve();
				})
				//handle error
				.catch(function (data) {
					user = false;
					deferred.reject();
				});
				//return promise object
				return deferred.promise;
			},
			register: function(name, email, username, password) {
				//create a new instance of deferred
				var deferred = $q.defer();
				//send a post request to the server
				console.log(name, email, username, password)
				$http.post('/signup', {userRealName: name, email: email, username: username, password: password})
				//handle success
				.then(function (data) {
					if(data.status === 200 && data.status) {
						deferred.resolve();
					} else {
						deferred.reject();
					}
				})
				//handle error
				.catch(function (data) {
					deferred.reject();
				});
				//return promise object
				return deferred.promise;
			},
			getUser: function() {
				return getUserName;
			}
		});
}]);
