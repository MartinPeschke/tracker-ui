'use strict';

angular.module('trackerui.system').controller('HeaderController', ['$scope', 'Global', 'underscore', function ($scope, Global, _) {
    $scope.menu = [];
    $scope.isCollapsed = false;


    $scope.user = Global.user;
    $scope.authenticated = !_.isEmpty(Global.user);

    $scope.$watch('user', function (newVal, oldVal) {
        $scope.authenticated = !_.isEmpty(Global.user);
    }, true);

}]);