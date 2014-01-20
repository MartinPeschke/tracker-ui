'use strict';

angular.module('trackerui.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [];
    
    $scope.isCollapsed = false;
}]);