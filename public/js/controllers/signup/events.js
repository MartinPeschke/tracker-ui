'use strict';

angular.module('trackerui.system').controller('SignupEventsController', ['$scope', '$http', '$state', 'underscore', 'ConfigService', 'StateService',
    function ($scope, $http, $state, _, ConfigService, State) {
        $scope.loading = false;
        $scope.errors = [];

        $scope.events = [];
        $scope.event = {'name': ''};
        $scope.eventTypes = [];
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
            if(form.$valid && !$scope.loading){
                $scope.errors = [];
                $scope.loading = true;

                var params = {
                    Id : State.account.Id,
                    Events: $scope.events
                };

                $http.post('/api/0.0.1/web/account/CreateEvents', params)
                    .success(function(data /*, status, headers, config*/) {
                        State.setAccount(data.Account);
                        if(State.isAuthenticated()){
                            $scope.workflowGoNext();
                        } else {
                            $scope.errors.push(data);
                        }
                        $scope.loading = false;
                    })
                    .error(function(data /*, status, headers, config*/) {
                        $scope.errors.push(data);
                        $scope.loading = false;
                    });
            }
        };
    }
]);