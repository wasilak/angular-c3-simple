Angular C3 Simple
=============
[![Code Climate](https://codeclimate.com/github/wasilak/angular-c3-simple/badges/gpa.svg)](https://codeclimate.com/github/wasilak/angular-c3-simple)
[![Bower version](https://badge.fury.io/bo/angular-c3-simple.svg)](https://badge.fury.io/bo/angular-c3-simple)

A simple [AngularJS](https://angularjs.org/) directive allowing to work with [C3.js](http://c3js.org/) which is [D3](http://d3js.org/) based chart rendering library.

You can see demo [here](http://wasilak.github.io/angular-c3-simple/).

Why bother?
-------------------

I needed a way to use C3.js in my AngularJS applications and all libraries/directives I came upon were either too complicated, incomplete or broken and not supported.

Biggest problem with them was that all of them included some kind of theit own API or a way to communicate with C3.js via them. I don't need extra directive attributes or other ways allowing me to access charts and set their options. Most of existing libs didn't even allow to set all of options available in C3.js.

All I needed was a directive, whish is a simple wrapper allowing me to **display chart** and use **any option available** while maintaining ability to use AngularJS **$scope and two-way data binding** for chart data.

This is why I bothered writing this plugin. If its features are what you are looking for - that's perfect! :)

INSTALLATION
-------------------

via bower:

```
bower install angular-c3-simple
```

or simply download latest source code from repository: [link](https://github.com/wasilak/angular-c3-simple/archive/master.zip)

USAGE
-------------------

First of all - you'll need some libraries and If you are using bower - you're in luck. They'll be installed for you. Otherwise, please do it manually or use CDN. Here it's what you need:

* D3 from [http://d3js.org/](http://d3js.org/)
* C3.js from [http://c3js.org/](http://c3js.org/)
* AngularJS from [https://angularjs.org/](https://angularjs.org/)

Link to them in your project:

```html
<script src="path/to/d3.min.js"></script>
<script src="path/to/c3.min.js"></script>
<script src="path/to/angular.min.js"></script>
<script src="path/to/angular_c3_simple.min.js"></script>
```

Angular C3 Simple directive uses simple markup: its name is ```c3-simple``` and you can use it either as:

* an Element ```<c3-simple id="chart" config="chart"></c3-simple>```
* an Attribute ```<div c3-simple id="chart" config="chart"></div>```

In both cases it accepts same parameters as attributes:

* id - and ID of element it is attached to, simple stuff nothing fancy
  > You can also set id of an element dynamically, by using `ng-attr-id`
* config - JavaScript object with all options you can use in C3.js [documentation](http://c3js.org/examples.html)
* ~~one thing to remember: for now Directive only knows how to handle ```data.columns``` ([docs](http://c3js.org/samples/data_columned.html)) type of data provided for chart. Any other might work, but it will not be change/update aware - ```$scope``` won't we working it's magic. I plan to implement this in near future, if there will be need for it.~~ Since version ```0.0.7``` you should be able to safely use any definition of ```data``` that C3.js accepts.

Now all you have to do is plug-in ```angular-c3-simple``` module into your application, maybe something like this:

```js
var angularDemo = angular.module('angularDemo', ['angular-c3-simple']);
```

afterwards you can initialize chart with any C3.js options available. For sake of this docs, I'll keep it simple. I'll set type of chart to `timeseries` with some example data (remember: **columns**) and I'll apply some custom formatting on X axis ticks and tooltips. Also I don't want legend. Here it goes:

```js
angularDemo.controller('DemoCtrl', ['$scope', function ($scope) {
    $scope.chart = {
      data : {
        x: 'x',
        type: 'area',
        columns: [
          ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 130, 340, 200, 500, 250, 350]
        ]
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
        show: false
      }
    };
});
```

Adjusting chart parameters is as easy as changing it's `config`, i.e. toggling visibility of chart _legend_:

```js
$scope.chart.legend.show = $scope.chart.legend.show ? false : true;
```

c3SimpleService
-------------

Oh, and there is one more nifty thing: **c3SimpleService**. This little fellow allows you to access and control any existing chart via C3.js API. You can use any API call available in documentation. All you have to do is pluig-in this service into your AngularJS controller, like this:

```js
angularDemo.controller('DemoCtrl', ['$scope', 'c3SimpleService', function ($scope, c3SimpleService) {

// here goes Controller code, maybe Chart initialization

}]);
```

After plugging-in you'll have all charts available via **c3SimpleService**. Let's say you have chart with ```id="myNewChart1"```. You can access it like this:

```js
c3SimpleService['#myNewChart1'];
```

> You can also set ```id``` of an element dynamically, by using ```ng-attr-id```

Now let's say you'd like to transform ```data1``` series from whatever it is now to ```bar``` type:

```js
c3SimpleService['#myNewChart1'].transform('bar', 'data1');
```

API
--------------

Basically all API other than installation and initial config is provided by C3.js docs.


Building / Minifing
----------

You can build minified version yourself, by simply using [Gulp](http://gulpjs.com/) in project root.

First, install node dependencies with ```npm install``` and run:

```bash
gulp
```

Contributing
--------------

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
