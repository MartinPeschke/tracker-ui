'use strict';

angular.module('mean', ['ngCookies', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.route', 'mean.system', 'mean.articles', 'mean.directives']);

angular.module('d3', []);
angular.module('Point2D', []);
angular.module('Polynomial', []);
angular.module('Intersection', ['Point2D', 'Polynomial']);
angular.module('underscore', []).factory('underscore', function() { return window._; });
angular.module('color', []).factory('color', function() { return window.net.brehaut.Color; });

angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('mean.directives', ['d3', 'underscore', 'color', 'Point2D', 'Intersection']);
