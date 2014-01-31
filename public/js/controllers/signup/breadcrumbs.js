'use strict';

angular.module('trackerui.system').controller('SignupBreadcrumbsController', ['$rootScope', '$scope', '$state', '$stateParams', function ($rootScope, $scope, $state, $stateParams) {

    $scope.currentStep = parseInt($stateParams.step || $state.current.data.step, 10);
    $scope.nextStep = $scope.currentStep + 1;
    $scope.totalSteps = $state.current.data.totalSteps;
    $scope.nextStepUrl = $state.href('signup.step', {step:$scope.nextStep})

    var unregister = $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState){

            if(toState.name.indexOf('signup.') == 0){

                $scope.currentStep = parseInt(toParams.step || toState.data.step, 10);
                $scope.nextStep = $scope.currentStep + 1;
                $scope.totalSteps = toState.data.totalSteps;

                if($scope.nextStep > toState.data.totalSteps){
                    $scope.nextStepUrl = $state.href('index');
                } else {
                    $scope.nextStepUrl = $state.href('signup.step', {step:$scope.nextStep})
                }

            }

        }
    );
    $scope.$on("$destroy", function(){
        unregister();
    });

}]);