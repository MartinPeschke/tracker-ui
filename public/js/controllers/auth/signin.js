'use strict';

angular.module('trackerui.system').controller('SigninController', ['$scope', '$http', '$state', 'AuthService',
    function ($scope, $http, $state, AuthService){

        $scope.errors = [];
        $scope.submit = function(loginReq, form){
            if(form.$valid && !$scope._LOADING_){
                $scope.errors = [];

                AuthService.authenticateUser(loginReq.email, loginReq.pwd)
                    .then(function resolve(success){
                        if(success)$state.go('index');
                        else $scope.errors.push('Unknown Email or Login');
                    });
            }
        };
    }
]);