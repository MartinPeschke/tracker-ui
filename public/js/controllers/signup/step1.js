'use strict';

angular.module('trackerui.system').controller('SignupController', ['$scope', '$http', '$state', 'UserService', function ($scope, $http, $state, User) {

    $scope.errors = [];
    $scope.loading = false;
    $scope.submit = function(signupReq, form){
        if(form.$valid && !$scope.loading){
            $scope.errors = [];
            $scope.loading = true;
            $http.post('/users', signupReq)
                .success(function(data /*, status, headers, config*/) {
                    User.set(data.User);
                    if(User.isAuthenticated()){
                        if(User.isComplete()){
                            $state.go('^.step2');
                        } else {
                            $state.go('index');
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