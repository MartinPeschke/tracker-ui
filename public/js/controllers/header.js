'use strict';

angular.module('trackerui.system').controller('HeaderController', ['$scope', '$state', 'StateService', function ($scope, $state, State) {
    $scope.menu = [];
    $scope.state = State;

    $scope.logout = function(){
        State.logout();
        $state.go( 'index' );
    };
}]);