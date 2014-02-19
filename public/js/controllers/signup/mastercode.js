'use strict';

angular.module('trackerui.system').controller('MasterCodeController', ['$scope', 'StateService', 'masterCodeService',
    function ($scope, State, masterCodeService) {
        $scope.state = State;
        $scope.masterCode = masterCodeService;
    }
]);