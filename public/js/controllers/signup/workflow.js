'use strict';

angular.module('trackerui.system').controller('SignupWorkflowController', ['$rootScope', '$scope', '$state', '$stateParams',
    function ($rootScope, $scope, $state, $stateParams) {

        var steps = $scope.allSteps = $state.current.data.steps,
            stepIdxLookup = [],
            getStepIdx = function(key){
                var idx = stepIdxLookup.indexOf(key);
                return idx;
            },
            setNaviState = function(state, params){
                $scope.currentStepIdx = getStepIdx(params.step || state.data.step);
                $scope.currentStep = steps[$scope.currentStepIdx];
                if($scope.currentStepIdx + 1 >= stepIdxLookup.length ){
                    $scope.nextStepParams = ['index'];
                } else {
                    $scope.nextStep = stepIdxLookup[($scope.currentStepIdx + 1)%stepIdxLookup.length];
                    $scope.nextStepParams = ['signup.step', {step:$scope.nextStep}];
                }
                return $scope.currentStepIdx < 0;
            };

        angular.forEach(steps, function(step){
            stepIdxLookup.push(step.key);
        });

        $scope.totalSteps = steps.length;
        $scope.workflowNextUrl = function(){
            return $state.href.apply($state, $scope.nextStepParams);
        };
        $scope.workflowGoNext = function(){
            return $state.go.apply($state, $scope.nextStepParams);
        };

        if(setNaviState($state.current, $stateParams))
            $state.go( 'index' );
        else {
            var unregister = $rootScope.$on('$stateChangeSuccess',
                function(event, toState, toParams){
                    if(toState.name.indexOf('signup.') === 0)
                        setNaviState(toState, toParams);
                }
            );
            $scope.$on('$destroy', function(){
                unregister();
            });
        }
    }]);