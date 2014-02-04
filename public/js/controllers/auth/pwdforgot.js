'use strict';

angular.module('trackerui.system').controller('PwdForgotController', ['$scope', '$state', 'toaster', 'BackendService',
    function ($scope, $state, toaster, backend) {
    $scope.errors = [];

    $scope.submit = function(forgotReq, form){
        if(form.$valid && !$scope.loading){
            $scope.errors = [];
            backend.post('/web/user/passwordforget', forgotReq,
                function success(data) {
                    if(data.DbMessage)$scope.errors.push(data.DbMessage);
                    else{
                        toaster.pop('success', 'Email Sent!', 'En Email with password reset instructions has been sent. Please check your inbox.');
                        $state.go( 'auth.signin' );
                    }
                }
            );
        }
    };
}]);