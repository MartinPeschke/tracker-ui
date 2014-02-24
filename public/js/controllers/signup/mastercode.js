'use strict';

angular.module('trackerui.system').controller('MasterCodeController', ['$scope', 'StateService', 'codeService',
    function ($scope, State, codeService) {
        $scope.state = State;
        $scope.copyState = {};

        $scope.getCode = function(platform){
            return codeService.getMasterCode(platform.Name);
        };
        $scope.getCodeToCopy = function(platform){
            // TODO: how to mark button as copied?
            $scope.copyState[platform.Name] = true;
            return $scope.getCode(platform)
        }
    }
]);