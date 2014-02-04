'use strict';

angular.module('trackerui.system').controller('PwdResetController', ['$scope', '$http', '$state', '$stateParams', 'underscore', 'toaster',
    function ($scope, $http, $state, $stateParams, _, toaster) {

    $scope.errors = [];
    $scope.loading = true;
    $scope.validated = null;
    $scope.token = $stateParams.token;

    if(!$scope.token)$scope.validated = false;
    else {
        $http.post('/user/pwdtokenvalid', {'Token': $scope.token})
            .success(function(data) {
                if(data.DbMessage){
                    toaster.pop('error', 'Invalid Token', 'Seems your token has expired.');
                    $state.go( 'index' );
                } else {
                    $scope.loading = false;
                    $scope.validated = true;
                }
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
                .success(function(data) {
                    if(data.success)
                        $state.go( 'auth.signin' );
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