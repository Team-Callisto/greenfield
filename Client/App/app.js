angular.module('app',['ngRoute', 'ngMaterial', 'smart-table', 'chart.js','app.home', 'app.data', 'app.login', 'app.signup','app.text','app.button', 'angularMoment'])

.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'app/home/home.html',
    controller: 'homeController',
    requireAuth: true
  })
  .when('/home', {
    templateUrl: 'app/home/home.html',
    controller: 'homeController',
    requireAuth: true
  })
  .when('/data', {
    templateUrl: 'app/data/data.html',
    controller: 'dataController',
    requireAuth: true
  })
  .when('/login', {
    templateUrl: 'app/login/login.html',
    controller: 'loginController',
    requireAuth: false
  })
  .when('/signup', {
    templateUrl: 'app/signup/signup.html',
    controller: 'signupController',
    requireAuth: false
  })
  .when('/text', {
    templateUrl : 'app/text/text.html',
    controller: 'textController',
    requireAuth: true
  })
  .otherwise({
    redirectTo: '/'
  })
})
.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
    if (next.$$route.requireAuth && AuthService.isLoggedIn() === false) {
      $location.path('/login');
      $route.reload();
    }
  });
});
