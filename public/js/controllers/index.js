'use strict';

angular.module('trackerui.system').controller('IndexController', ['$scope', function ($scope) {
    $scope.d3Data = [
        {title: 'Greg', score:12, intersect: 5, id:1},
        {title: 'Ari', score:43, intersect: 10, id:2},
        {title: 'Loser', score: 87, intersect: 20, id:3}
    ];
}]);