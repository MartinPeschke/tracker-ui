'use strict';

angular.module('trackerui.system').controller('MasterCodeController', ['$scope', 'StateService',
    function ($scope, State) {
        $scope.state = State;
    }
]);