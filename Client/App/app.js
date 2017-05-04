angular.module('app',['ngRoute', 'ngMaterial', 'chart.js','app.home', 'app.data', 'app.login', 'app.signup','app.text'])

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
  .when('/text', {
    templateUrl : 'app/text/text.html',
    controller: 'textController'
  })
})
