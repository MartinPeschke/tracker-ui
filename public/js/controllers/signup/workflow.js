'use strict';

angular.module('trackerui.system').controller('SignupWorkflowController', ['$rootScope', '$scope', '$state', '$stateParams',
    function ($rootScope, $scope, $state, $stateParams) {

    $scope.currentStep = parseInt($stateParams.step || $state.current.data.step, 10);
    $scope.nextStep = $scope.currentStep + 1;
    $scope.totalSteps = $state.current.data.totalSteps;
    $scope.nextStepParams = ['signup.step', {step:$scope.nextStep}];

    $scope.nextUrl = function(){
        return $state.href.apply($state, $scope.nextStepParams);
    };
    $scope.goNextUrl = function(){
        return $state.go.apply($state, $scope.nextStepParams);
    };

    var unregister = $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams){

            if(toState.name.indexOf('signup.') === 0){

                $scope.currentStep = parseInt(toParams.step || toState.data.step, 10);
                $scope.nextStep = $scope.currentStep + 1;
                $scope.totalSteps = toState.data.totalSteps;

                if($scope.nextStep > toState.data.totalSteps){
                    $scope.nextStepParams = ['index'];
                } else {
                    $scope.nextStepParams = ['signup.step', {step:$scope.nextStep}];
                }

            }

        }
    );
    $scope.$on('$destroy', function(){
        unregister();
    });

}]);