'use strict';

angular.module('trackerui', ['ngCookies', 'ngResource', 'ngRoute', 'ui.bootstrap', 'trackerui.system', 'trackerui.directives']);

angular.module('underscore', []).factory('underscore', function() { return window._; });
angular.module('color', []).factory('color', function() { return window.net.brehaut.Color; });

angular.module('trackerui.system', []);
angular.module('trackerui.directives', ['d3', 'underscore', 'color', 'Point2D', 'Intersection']);
