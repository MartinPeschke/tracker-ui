'use strict';

angular.module('trackerui.system').controller('SignupController', ['$scope', '$http', '$state', 'StateService',
    function ($scope, $http, $state, State) {

    $scope.errors = [];
    $scope.loading = false;
    $scope.submit = function(signupReq, form){
        if(form.$valid && !$scope.loading){
            $scope.errors = [];
            $scope.loading = true;
            $http.post('/users', signupReq)
                .success(function(data /*, status, headers, config*/) {
                    State.setUser(data.User);
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