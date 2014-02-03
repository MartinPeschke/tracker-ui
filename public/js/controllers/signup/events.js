'use strict';

angular.module('trackerui.system').controller('SignupEventsController', ['$scope', '$http', '$state', 'StateService',
    function ($scope, $http, $state, State) {

        $scope.eventTypes = [
            {name: 'Signup'},
            {name: 'Purchase'},
            {name: 'Review'}
        ];

        $scope.errors = [];

        $scope.model = {PlatForms: $scope.eventTypes};

        $scope.loading = false;
        $scope.submit = function(model, form){
            if(form.$valid && !$scope.loading){
                $scope.errors = [];
                $scope.loading = true;
                model.User = {'Id':State.user.Id};

                model.Account.Platforms = [{'Name':'Android'}, {'Name':'iPad'}];

                $http.post('/account', model)
                    .success(function(data /*, status, headers, config*/) {
                        State.setAccount(data.Account);
                        if(State.isAuthenticated()){
                            if(State.isSignupComplete()){
                                $state.go( 'index' );
                            } else {
                                $scope.workflowGoNext();
                            }
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