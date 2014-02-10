'use strict';

angular.module('trackerui.directives')
    .directive('keepHeight', ['$window', function ($window) {
    return function (scope, element) {
        $window.onresize = function(){
            element.css('height', ($window.innerHeight - 50) + 'px');
        };
        $window.onresize();
    };
}]);