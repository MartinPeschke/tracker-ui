'use strict';

angular.module('trackerui.system').controller('SignupAccountController', ['$scope', '$state', 'underscore', 'BackendService', 'ConfigService', 'StateService',
    function ($scope, $state, _, backend, ConfigService, State) {

        $scope.platforms = [];
        ConfigService.then(function(config){
            $scope.platforms = _.map(config.Platforms, function(ev){
                return {name: ev.Name};
            });
        });


        $scope.errors = [];

        $scope.model = {};

        $scope.submit = function(model, form){
            if(form.$valid && !$scope._LOADING_){
                $scope.errors = [];

                model.User = {'Id':State.user.Id};
                model.Account.Platforms = [];
                for(var i in $scope.platforms){
                    if($scope.platforms[i].enabled)
                        model.Account.Platforms.push({'name':$scope.platforms[i].name});
                }

                backend.post('/web/account/create', model,
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
    }]);