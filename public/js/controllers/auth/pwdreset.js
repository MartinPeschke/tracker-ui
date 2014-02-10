'use strict';

angular.module('trackerui.system').controller('PwdResetController', ['$scope', '$state', '$stateParams', 'underscore', 'toaster', 'BackendService',
    function ($scope, $state, $stateParams, _, toaster, backend) {

        $scope.errors = [];
        $scope.loading = true;
        $scope.validated = null;
        $scope.token = $stateParams.token;

        if(!$scope.token)$scope.validated = false;
        else {
            backend.post('/web/user/isTokenValid', {'Token': $scope.token},
                function success(data){
                    if(data.DbMessage){
                        toaster.pop('error', 'Invalid Token', 'Seems your token has expired.');
                        $state.go( 'index' );
                    } else
                        $scope.validated = true;
                        $scope.loading = false;
                });
        }

        $scope.submit = function(forgotReq, form){
            if($scope.validated && form.$valid && !$scope.loading){
                $scope.errors = [];
                $scope.loading = true;

                backend.post('/web/user/UpdatePassword', _.extend({PwdForgetTokens:[ {Token:$scope.token} ]}, forgotReq),
                    function success(data) {
                        if(data.DbMessage){
                            toaster.pop('error', 'Invalid Token', 'Seems your token has expired.');
                        } else
                            $state.go( 'auth.signin' );
                    })
            }
        };
    }]);