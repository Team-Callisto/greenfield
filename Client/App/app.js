var app = angular.module('myApp',['myApp.userInput','ngRoute'])
//include angular router link in the html

.config(function($routeProvider){
  .when("/",{
     templateUrl : "App/index.html"
  })
  .when("/",{
    templateUrl : "App/Home/home.html"
  })
})

<link home.html>
NG-VIEW
