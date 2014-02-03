'use strict';

angular.module('trackerui.system').controller('SignupWorkflowController', ['$rootScope', '$scope', '$state', '$stateParams',
    function ($rootScope, $scope, $state, $stateParams) {

        var steps = $state.current.data.steps,
            setNavi = function(state, params){
                $scope.currentStep = params.step || state.data.step;
                $scope.currentStepIdx = steps.indexOf($scope.currentStep);
                if($scope.currentStepIdx + 1 >= steps.length ){
                    $scope.nextStepParams = ['index'];
                } else {
                    $scope.nextStep = steps[($scope.currentStepIdx + 1)%steps.length];
                    $scope.nextStepParams = ['signup.step', {step:$scope.nextStep}];
                }
                return $scope.currentStepIdx < 0;
            };

        $scope.totalSteps = steps.length;
        $scope.workflowNextUrl = function(){
            return $state.href.apply($state, $scope.nextStepParams);
        };
        $scope.workflowGoNext = function(){
            return $state.go.apply($state, $scope.nextStepParams);
        };

        if(setNavi($state.current, $stateParams))
            $state.go( 'index' );
        else {
            var unregister = $rootScope.$on('$stateChangeStart',
                function(event, toState, toParams){
                    if(toState.name.indexOf('signup.') === 0)
                        setNavi(toState, toParams);
                }
            );
            $scope.$on('$destroy', function(){
                unregister();
            });
        }
    }]);