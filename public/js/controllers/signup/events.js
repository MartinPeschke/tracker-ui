'use strict';

angular.module('trackerui.system').controller('SignupEventsController', ['$scope', '$state', 'underscore', 'BackendService', 'ConfigService', 'StateService',
    function ($scope, $state, _, backend, ConfigService, State) {
        $scope.errors = [];

        $scope.events = [];
        $scope.event = {'name': ''};
        $scope.eventTypes = [];

        $scope.state = State;

        ConfigService.then(function(config){
            $scope.eventTypes = _.map(config.Events, function(ev){
                return {name: ev.Name};
            });
        });

        $scope.addPreEvent = function(model){
            $scope.eventTypes = _.without($scope.eventTypes, model);
            $scope.events.push(model);
        };
        $scope.appendEvent = function(model){
            $scope.events.push(model);
            $scope.event = {'name': ''};
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