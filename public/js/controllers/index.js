'use strict';

angular.module('trackerui.system').controller('IndexController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
    $scope.title = 'Some d3 stuff';
    $scope.distance = 70;
    $scope.radius = 100;

    $scope.d3Data = [
        {title: 'Greg', score:12, intersect: 5, id:1},
        {title: 'Ari', score:43, intersect: 10, id:2},
        {title: 'Loser', score: 87, intersect: 20, id:3}
    ];
}]);