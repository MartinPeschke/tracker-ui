'use strict';

angular.module('trackerui.system').controller('MasterCodeController', ['$scope', '$state', 'StateService', 'codeService',
    function ($scope, $state, State, codeService) {
        $scope.state = State;
        if(!(State.account&&State.account.Events&&State.account.Events.length)){
            return $state.go.apply($state, $scope.prevStepParams);
        }

        $scope.copyState = {};
        $scope.getCode = function(platform){
            return codeService.getMasterCode(platform.Name);
        };
        $scope.getCodeToCopy = function(platform){
            // TODO: how to mark button as copied?
            $scope.copyState[platform.Name] = true;
            return $scope.getCode(platform);
        }
    }
]);