angular.module('app',['ngRoute', 'ngMaterial', 'nvd3', 'app.home', 'app.data', 'app.login', 'app.signup'])

.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'app/home/home.html',
    controller: 'homeController'
  })
  .when('/home', {
    templateUrl: 'app/home/home.html',
    controller: 'homeController'
  })
  .when('/data', {
    templateUrl: 'app/data/data.html',
    controller: 'dataController'
  })
  .when('/login', {
    templateUrl: 'app/login/login.html'
  })
  .when('/signup', {
    templateUrl: 'app/signup/signup.html',
  })
})
