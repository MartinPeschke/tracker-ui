'use strict';

angular.module('trackerui.system').controller('SignupEventsController', ['$scope', '$state', 'underscore', 'BackendService', 'ConfigService', 'StateService',
    function ($scope, $state, _, backend, ConfigService, State) {
        $scope.errors = [];

        $scope.state = State;
        $scope.customEvent = {'name': ''};

        $scope.defaultEvents = [];
        $scope.selectedEvents = [];
        ConfigService.then(function(config){
            angular.forEach(config.Events, function(model){
                $scope.defaultEvents.push(model);
            });
        });
        $scope.addEvent = function(model){
            $scope.defaultEvents = _.without($scope.defaultEvents, model);
            $scope.selectedEvents.push(model);
        };
        $scope.removeEvent = function(model){
            $scope.selectedEvents = _.without($scope.selectedEvents, model);
            $scope.defaultEvents.push(model);
        };

        $scope.appendEvent = function(model){
            $scope.selectedEvents.push(model);
            $scope.customEvent = {'name': ''};
        };

        $scope.submit = function(model, form){
            if(form.$valid && !$scope._LOADING_){
                $scope.errors = [];

                var params = {
                    Id : State.account.Id,
                    Events: $scope.events
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