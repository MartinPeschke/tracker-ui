'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
    $scope.title = "Some d3 stuff";
    $scope.d3Data = [
        {title: "Greg", score:12},
        {title: "Ari", score:43},
        {title: "Loser", score: 87}
      ];
}]);