'use strict';

angular.module('trackerui.system').controller('HeaderController', ['$scope', '$window', 'StateService', function ($scope, $window, State) {
    $scope.menu = [];
    $scope.state = State;

    $scope.logout = function(){
        State.logout();
        $window.location.href = '/'
    };
}]);