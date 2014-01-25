'use strict';

angular.module('trackerui.system').controller('PwdResetController', ['$scope', '$http', '$location', '$routeParams', function ($scope, $http, $location, $routeParams) {

    $scope.errors = [];
    $scope.loading = true;
    $scope.validated = null;
    $scope.token = $routeParams.token;

    if(!$scope.token)$scope.validated = false;
    else {
        $http.post('/user/pwdforgot', {PasswordForgetToken: $scope.token})
            .success(function(data /*, status, headers, config*/) {
                $scope.validated = !data.DbMessage;
                $scope.loading = false;
            })
            .error(function(/* data, status, headers, config */) {
                $scope.validated = false;
                $scope.loading = false;
            });
    }


    $scope.submit = function(forgotReq, form){
        if(form.$valid && !$scope.loading){
            $scope.errors = [];
            $scope.loading = true;
            $http.post('/user/pwdreset', forgotReq)
                .success(function(data /*, status, headers, config*/) {
                    if(data.success)
                        $location.path( '/signin' );
                    else
                        $scope.errors.push('Invalid token');
                    $scope.loading = false;
                })
                .error(function(/* data, status, headers, config */) {
                    $scope.errors.push('Invalid token');
                    $scope.loading = false;
                });
        }
    };
}]);