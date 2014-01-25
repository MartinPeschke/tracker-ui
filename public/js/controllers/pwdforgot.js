'use strict';

angular.module('trackerui.system').controller('PwdForgotController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

    $scope.errors = [];
    $scope.loading = false;
    $scope.submit = function(forgotReq, form){
        if(form.$valid && !$scope.loading){
            $scope.errors = [];
            $scope.loading = true;
            $http.post('/user/pwdforgot', forgotReq)
                .success(function(data /*, status, headers, config*/) {
                    $location.path( '/signin' );
                    $scope.loading = false;
                })
                .error(function(/* data, status, headers, config */) {
                    $scope.errors.push('Unknown Email or Login');
                    $scope.loading = false;
                });
        }
    };
}]);