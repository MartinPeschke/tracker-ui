'use strict';

angular.module('trackerui.system').controller('SignupEventsController', ['$scope', '$state', 'underscore', 'BackendService', 'ConfigService', 'StateService',
    function ($scope, $state, _, backend, ConfigService, State) {
        $scope.errors = [];
        $scope.state = State;
        if(!State.accountSetup()){
            return $state.go.apply($state, $scope.prevStepParams);
        }



        $scope.customEvent = {'Name': ''};

        $scope.defaultEvents = [];
        $scope.selectedEvents = State.account&&State.account.Events||[];
        ConfigService.then(function(config){
            var eventNames = State.account?_.pluck(State.account.Events, 'Name'):'';
            angular.forEach(config.Events, function(model){
                if(!~eventNames.indexOf(model.Name))
                    $scope.defaultEvents.push(model);
            });
        });
        $scope.addEvent = function(model){
            $scope.defaultEvents = _.without($scope.defaultEvents, model);
            $scope.selectedEvents.push(model);
            $scope.errors = [];
        };
        $scope.removeEvent = function(model){
            $scope.selectedEvents = _.without($scope.selectedEvents, model);
            $scope.defaultEvents.push(model);
        };

        $scope.appendEvent = function(model){
            $scope.selectedEvents.push(model);
            $scope.customEvent = {'Name': ''};
            $scope.errors = [];
        };

        $scope.submit = function(model, form){
            if(!$scope.selectedEvents.length){
                $scope.errors = ['You need to add at least one Event!'];
            } else if(!$scope._LOADING_){
                $scope.errors = [];

                var params = {
                    Id : State.account.Id,
                    Events: $scope.selectedEvents
                };

                backend.post('/web/account/CreateEvents', params,
                    function success(data) {
                        State.setAccount(data.Account);
                        if(State.isAuthenticated()){
                            $scope.workflowGoNext();
                        } else {
                            $scope.errors.push(data);
                        }
                    });
            }
        };
    }
]);