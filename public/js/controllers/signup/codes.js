'use strict';

angular.module('trackerui.system').controller('SignupCodesController', ['$scope', 'StateService','eventCodeService',
    function ($scope, State, eventCodeService) {
        $scope.state = State;

        $scope.codeSnippets = [];
        $scope.displayEventCodes = function(event){
            $scope.selected = event;
            $scope.codeSnippets = [];
            for (var i=0; i<$scope.state.account.Platforms.length;i++){
                var snippet = {};
                snippet.platformName = $scope.state.account.Platforms[i].Name;
                snippet.code = eventCodeService.createCodeSnippet(event.Name,snippet.platformName );
                $scope.codeSnippets.push(snippet);
            }
        };
        //preselected first event
        $scope.selected = $scope.state.account.Events[0];
        $scope.displayEventCodes($scope.selected);

        $scope.getTextToCopy = function(code){
            return code;
        };
    }
]);