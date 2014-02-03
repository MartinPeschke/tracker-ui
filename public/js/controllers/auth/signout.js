'use strict';

angular.module('trackerui.system').controller('SignoutController', ['$state', 'StateService', function ($state, State) {
    State.logout();
    $state.go( 'index' );
}]);