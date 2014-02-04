'use strict';

angular.module('trackerui.system').controller('SignupController', ['$scope', '$http', '$state', 'AuthService',
    function ($scope, $http, $state, AuthService) {

        $scope.errors = [];
        $scope.submit = function(signupReq, form){
            if(form.$valid && !$scope._LOADING_){
                $scope.errors = [];

                AuthService.createUser(signupReq)
                    .then(function resolve(success){
                        if(success)$scope.workflowGoNext();
                        else $scope.errors.push('Unknown Email or Login');
                    });
            }
        };
    }
]);