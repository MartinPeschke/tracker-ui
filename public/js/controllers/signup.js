'use strict';

angular.module('trackerui.system').controller('SignupController', ['$scope', '$http', '$location', 'Global', function ($scope, $http, $location, Global) {
    $scope.global = Global;
    $scope.submit = function(model, form){
        if(form.$valid){
            $http.post('/users', model).
                success(function(data, status, headers, config) {
                    Global.setUser(data.User);
                    $location.path( "/" );
                }).
                error(function(data, status, headers, config) {
                    console.log('ERROR', data, status);
                });
        }
    };
}]);