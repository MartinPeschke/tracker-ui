'use strict';

angular.module('trackerui.system').controller('HeaderController', ['$scope', '$window', 'StateService', function ($scope, $window, State) {

    $scope.getName = function(){return State.user.Name||"";};
    $scope.isAuthenticated = angular.bind(State, State.isAuthenticated);

    $scope.logout = function(){
        State.logout();
        $window.location.href = '/';
    };
}]);