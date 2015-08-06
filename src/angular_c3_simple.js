// using C3 (be sure to include it before, same with D3, which C3 requires)
;(function(c3) {
    'use strict';

    // module definition, this has to be included in your app
    angular.module('angular-c3-simple', [])

    // service definition, if you want to use itm you have to include it in controller
    // this service allows you to access every chart by it's ID and thanks to this,
    // you can perform any API call available in C3.js http://c3js.org/examples.html#api
    .service('c3SimpleService', function() {
        return {};
    })

    // directive definition, if you want to use itm you have to include it in controller
    .directive('c3Simple', ['c3SimpleService', function(c3SimpleService) {
        return {
          // this directive can be used as an Element or an Attribute
          restrict: 'EA',
          scope: {
            // setting config attribute to isolated scope
            // config object is 1:1 configuration C3.js object, for avaiable options see: http://c3js.org/examples.html
            config: '='
          },
          template: '<div></div>',
          replace: true,
          controller: function($scope, $element) {

            // binding chart to element with provided ID
            $scope.config.bindto = '#' + $element[0].id;

            //Generating the chart on every data change
            $scope.$watch('config.data.columns', function(newSeries, oldSeries) {

              // adding (or overwriting) chart to service c3SimpleService
              // we are regenerating chart on each change - this might seem slow and unefficient
              // but works pretty well and allows us to have more controll
              c3SimpleService[$scope.config.bindto] = c3.generate($scope.config);

              // if there is no size specified, we are assuming, that chart will have width
              // of its container (proportional of course) - great for responsive design
              if (!$scope.config.size) {
                  c3SimpleService[$scope.config.bindto].resize();
              }
            });
          }
        };
    }]);
}(c3));
