'use strict';

angular.module('trackerui.system').controller('SignupAccountController', ['$scope', '$state', 'underscore', 'BackendService', 'ConfigService', 'StateService',
    function ($scope, $state, _, backend, ConfigService, State) {

        $scope.defaultPlatforms = [null,null,null,null,null];
        $scope.selectedPlatforms = [null,null,null,null,null];

        var append = function(li){
                return function(elem){
                    return li[li.indexOf(null)] = elem;
                };
            },
            appendDefault = append($scope.defaultPlatforms),
            appendSelected = append($scope.selectedPlatforms),
            remove = function(li){
                return function(elem){
                    return li[li.indexOf(null)] = elem;
                };
            },
            removeDefault = remove($scope.defaultPlatforms),
            removeSelected = remove($scope.selectedPlatforms);

        ConfigService.then(function(config){
            angular.forEach(config.Platforms, appendDefault);
        });

        $scope.addPlatform = function(model){
            removeDefault(model);
            appendSelected(model);
        };
        $scope.removePlatform = function(model){
            removeSelected(model);
            appendDefault(model);
        };

        $scope.errors = [];

        $scope.model = {};

        $scope.submit = function(model, form){
            if(form.$valid && !$scope._LOADING_){
                $scope.errors = [];

                model.User = {'Id':State.user.Id};
                model.Account.Platforms = [];
                for(var i in $scope.defaultPlatforms){
                    if($scope.defaultPlatforms[i].enabled)
                        model.Account.Platforms.push({'name':$scope.defaultPlatforms[i].name});
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