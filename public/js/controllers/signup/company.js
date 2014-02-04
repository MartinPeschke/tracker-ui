'use strict';

angular.module('trackerui.system').controller('SignupController', ['$scope', '$http', '$state', 'AuthService',
    function ($scope, $http, $state, AuthService) {

        $scope.errors = [];
        $scope.loading = false;
        $scope.submit = function(signupReq, form){
            if(form.$valid && !$scope.loading){
                $scope.errors = [];
                $scope.loading = true;

                AuthService.createUser(signupReq)
                    .then(function resolve(success){
                        if(success)$scope.workflowGoNext();
                        else $scope.errors.push('Unknown Email or Login');
                    })
                    ['finally'](function _finally(/*msg*/){
                    $scope.loading = false;
                });
            }
        };
    }
]);