'use strict';

angular.module('trackerui.system').controller('HeaderController', ['$scope', 'StateService', function ($scope, State) {
    $scope.menu = [];
    $scope.isCollapsed = false;


    $scope.user = State.user;
    $scope.authenticated = State.isAuthenticated();

    $scope.$watch('user', function (/*newVal , oldVal */) {
        $scope.authenticated = State.isAuthenticated();
    }, true);

}]);