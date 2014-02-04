'use strict';

angular.module('trackerui.system').controller('PwdForgotController', ['$scope', '$state', 'BackendService', function ($scope, $state, backend) {
    $scope.errors = [];

    $scope.submit = function(forgotReq, form){
        if(form.$valid && !$scope.loading){
            $scope.errors = [];
            backend.post('/web/user/passwordforget', forgotReq,
                function success(data) {
                    if(data.DbMessage)$scope.errors.push(data.DbMessage);
                    else
                        $state.path( 'auth.signin' );
                }
            );
        }
    };
}]);