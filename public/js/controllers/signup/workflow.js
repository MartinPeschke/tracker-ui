'use strict';

angular.module('trackerui.system').controller('SignupWorkflowController', ['$rootScope', '$scope', '$state', '$stateParams','StateService','underscore',
    function ($rootScope, $scope, $state, $stateParams, State, _) {


        $scope.account = State.account;
        $scope.platformString = function(){
            return _.pluck(State.account.Platforms, 'Name').join(', ');
        };
        $scope.eventString = function(){
            return _.pluck(State.account.Events, 'Name').join(', ');
        };

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

                if($scope.currentStepIdx == 0 ){
                    $scope.prevStepParams = ['index'];
                } else {
                    $scope.prevStep = stepIdxLookup[$scope.currentStepIdx - 1];
                    $scope.prevStepParams = ['signup.step', {step:$scope.prevStep}];
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