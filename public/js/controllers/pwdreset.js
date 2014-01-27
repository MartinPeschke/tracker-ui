'use strict';

angular.module('trackerui.system').controller('PwdResetController', ['$scope', '$http', '$location', '$routeParams', 'underscore', function ($scope, $http, $location, $routeParams, _) {

    $scope.errors = [];
    $scope.loading = true;
    $scope.validated = null;
    $scope.token = $routeParams.token;

    if(!$scope.token)$scope.validated = false;
    else {
        $http.post('/user/pwdtokenvalid', {'PwdForgetTokens':[{'Token': $scope.token}]})
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
        if($scope.validated && form.$valid && !$scope.loading){
            $scope.errors = [];
            $scope.loading = true;

            $http.post('/user/pwdreset', _.extend({token: $scope.token}, forgotReq))
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