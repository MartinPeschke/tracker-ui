'use strict';

angular.module('trackerui.system').controller('SigninController', ['$scope', '$http', 'Global', function ($scope, $http, Global) {
    $scope.global = Global;
    $scope.submit = function(model, form){
        if(form.$valid){
            $http.post('/users/session', model).
                success(function(data, status, headers, config) {
                    console.log(data, status);
                }).
                error(function(data, status, headers, config) {
                    console.log(data, status);
                });
        }
    };
}]);