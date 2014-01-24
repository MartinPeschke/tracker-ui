'use strict';

angular.module('trackerui.system').controller('HeaderController', ['$scope', 'UserService', function ($scope, User) {
    $scope.menu = [];
    $scope.isCollapsed = false;


    $scope.user = User.data;
    $scope.authenticated = User.isAuthenticated();

    $scope.$watch('user', function (/*newVal , oldVal */) {
        $scope.authenticated = User.isAuthenticated();
    }, true);

}]);