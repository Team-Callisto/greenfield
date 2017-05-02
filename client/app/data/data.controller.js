angular.module('app.data',[])
.controller("dataController",function($scope, $http){
  let userData = 'testing';

  $scope.options = {
            chart: {
                type: 'lineChart',
                height: 400,
                width: 600,
                margin : {
                    top: 40,
                    right: 40,
                    bottom: 40,
                    left: 60
                },
                x: function(d){ return d.x; },
                y: function(d){ return d.y; },
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Time'
                },
                yAxis: {
                    axisLabel: 'Level',
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    },
                    axisLabelDistance: -10
                },
                callback: function(chart){
                    console.log("LineChart rendered!");
                }
            },
            title: {
                enable: true,
                text: 'Your Daily Summary'
            }
        };

  $scope.tempData = [
    {
      "values": [
        {"x":7, "y": 0},
        {"x":8, "y": 1},
        {"x":9, "y": 0},
        {"x":10, "y": -2},
        {"x":11, "y": -3},
        {"x":12, "y": 0},
        {"x":13, "y": 1},
        {"x":14, "y": 2},
        {"x":15, "y": 1},
        {"x":16, "y": 3},
        {"x":17, "y": 0},
        {"x":18, "y": 0},
        {"x":19, "y": -1},
        {"x":20, "y": -3},
        {"x":21, "y": 0}
      ]
    }
  ]

  $scope.displayTable = function() {
    $http({
      method: 'GET',
      url: '/data'
    })
    .then(function(resp) {
      console.log(resp.data);
      userData = resp.data;
      $scope.tableGraph = userData; // temp, just to display server response
    });
  }
})
