'use strict';

angular.module('trackerui.system').controller('SignupCodesController', ['$scope', 'StateService','eventCodeService',
    function ($scope, State, eventCodeService) {
        $scope.state = State;

        $scope.codeSnippets = [];

        $scope.displayEventCodes = function(event){
            $scope.codeSnippets = [];
            for (var i=0; i<$scope.state.account.Platforms.length;i++){
                var snippet = new Object();
                snippet.platformName = $scope.state.account.Platforms[i].Name;
                snippet.code = eventCodeService.createCodeSnippet(event.Name,snippet.platformName );
                $scope.codeSnippets.push(snippet);
            }
        }
    }
]);