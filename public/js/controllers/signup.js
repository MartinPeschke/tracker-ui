'use strict';

angular.module('trackerui.system').controller('SignupController', ['$scope', '$http', '$location', 'UserService', function ($scope, $http, $location, User) {

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
                        $location.path( '/' );
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