angular.module('app',['ngRoute', 'ngMaterial', 'chart.js','app.home', 'app.data', 'app.login', 'app.signup','app.text'])

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
  .otherwise({
    redirectTo: '/'
  })
  .when('/text', {
    templateUrl : 'app/text/text.html',
    controller: 'textController'
  })
})
.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      console.log(next)
    if (next.$$route.requireAuth && AuthService.isLoggedIn() === false) {
      $location.path('/login');
      $route.reload();
    }
  });
});
