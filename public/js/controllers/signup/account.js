'use strict';

angular.module('trackerui.system').controller('SignupAccountController', ['$scope', '$http', '$state', 'underscore', 'ConfigService', 'StateService',
    function ($scope, $http, $state, _, ConfigService, State) {

        $scope.deviceTypes = [
            {name: 'Android'},
            {name: 'iOS'},
            {name: 'Web'},
            {name: 'WinPho'}
        ];

        ConfigService.then(function(config){
            console.log(config);
        });


        $scope.errors = [];

        $scope.model = {};
        $scope.platforms = $scope.deviceTypes;

        $scope.loading = false;
        $scope.submit = function(model, form){
            if(form.$valid && !$scope.loading){
                $scope.errors = [];
                $scope.loading = true;

                model.User = {'Id':State.user.Id};
                model.Account.Platforms = [];
                for(var i in $scope.platforms){
                    if($scope.platforms[i].enabled)
                        model.Account.Platforms.push({'name':$scope.platforms[i].name});
                }

                $http.post('/api/0.0.1/web/account/create', model)
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
    }]);