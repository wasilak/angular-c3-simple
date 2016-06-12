var angularDemo = angular.module('angularDemo', ['angular-c3-simple'])

	.controller('DemoCtrl', ['$scope', 'c3SimpleService', function ($scope, c3SimpleService) {
		
	$scope.dynamicChartId = 'chart';

	$scope.chartType = {};
	$scope.chartType.data1 = 'area';
	$scope.chartType.data2 = 'area-step';

	$scope.filterOptions = [
		{
			name: 'area',
			value: 'area'
		},
		{
			name: 'line',
			value: 'line'
		},
		{
			name: 'bar',
			value: 'bar'
		},
		{
			name: 'spline',
			value: 'spline'
		},
		{
			name: 'step',
			value: 'step'
		},
		{
			name: 'area-step',
			value: 'area-step'
		},
		{
			name: 'scatter',
			value: 'scatter'
		}
	];

	$scope.transform = function(chartId, serie) {
		c3SimpleService['#' + chartId].transform($scope.chartType[serie], serie);
	};
	
	var getRandomData = function() {
		return [
			['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
			['data1', Math.round(Math.random() * 1000), Math.round(Math.random() * 1000), Math.round(Math.random() * 1000), Math.round(Math.random() * 1000), Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
			['data2', Math.round(Math.random() * 1000), Math.round(Math.random() * 1000), Math.round(Math.random() * 1000), Math.round(Math.random() * 1000), Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
		];
	};
	
	$scope.generateData = function(chartId) {
		$scope.chart.data.columns = getRandomData();
	};
	
	$scope.toggleLegend = function(chartId) {
		console.log('toggleLegend');
		$scope.chart.legend.show = $scope.chart.legend.show ? false : true;
	};

	$scope.chart = {
		data : {
			x: 'x',
			type: 'area',
			columns: getRandomData(),
			types: {
					data1: $scope.chartType.data1,
					data2: $scope.chartType.data2
				},
		},
		axis: {
			x:{
				type: "timeseries",
				tick: {
					format: function(value) {
						var month = value.getUTCMonth() + 1;
						var year = value.getUTCFullYear();
						return month + '-' + year;
					}
				}
			}
		},
		tooltip: {
			format: {
				value: function (value, ratio, id) {
						return value;
				}
			}
		},
		legend: {
			show: true
		}
	};
}
]);
