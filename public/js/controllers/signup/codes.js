'use strict';

angular.module('trackerui.system').controller('SignupCodesController', ['$scope', 'StateService',
    function ($scope, State) {
        $scope.state = State;
    }
]);