'use strict';

angular.module('trackerui.system').controller('SignupAccountController', ['$scope', '$state', 'underscore', 'BackendService', 'ConfigService', 'StateService',
    function ($scope, $state, _, backend, ConfigService, State) {

        $scope.state = State;

        $scope.defaultPlatforms = [];
        $scope.selectedPlatforms = State.account.Platforms||[];

        ConfigService.then(function(config){
            var platformNames = State.account?_.pluck(State.account.Platforms, 'Name'):'';
            angular.forEach(config.Platforms, function(model){
                if(!~platformNames.indexOf(model.Name))
                    $scope.defaultPlatforms.push(model);
            });
        });
        $scope.addPlatform = function(model){
            $scope.defaultPlatforms = _.without($scope.defaultPlatforms, model);
            $scope.selectedPlatforms.push(model);
            $scope.errors = [];
        };
        $scope.removePlatform = function(model){
            $scope.selectedPlatforms = _.without($scope.selectedPlatforms, model);
            $scope.defaultPlatforms.push(model);
        };

        $scope.errors = [];

        $scope.model = {'Account':State.account};

        $scope.submit = function(model, form){
            if(!$scope.selectedPlatforms.length){
                $scope.errors = ['You need to add at least one Platform!'];
            } else  if(form.$valid && !$scope._LOADING_){
                $scope.errors = [];

                model.User = {'Id':State.user.Id};
                model.Account.Platforms = [];
                angular.forEach($scope.selectedPlatforms, function(p){
                    model.Account.Platforms.push({'Name': p.Name});
                });

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