'use strict';

angular.module('trackerui.system').controller('SigninController', ['$scope', '$http', '$location', 'StateService', function ($scope, $http, $location, State) {

    $scope.errors = [];
    $scope.loading = false;
    $scope.submit = function(loginReq, form){
        if(form.$valid && !$scope.loading){
            $scope.errors = [];
            $scope.loading = true;
            $http.post('/users/session', loginReq)
                .success(function(data /*, status, headers, config*/) {
                    State.setUser(data.User);
                    if(State.isAuthenticated()){
                        $location.path( '/' );
                    } else {
                        $scope.errors.push('Unknown Email or Login');
                    }
                    $scope.loading = false;
                })
                .error(function(/* data, status, headers, config */) {
                    $scope.errors.push('Unknown Email or Login');
                    $scope.loading = false;
                });
        }
    };
}]);