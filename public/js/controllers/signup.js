'use strict';

angular.module('trackerui.system').controller('SignupController', ['$scope', '$http', '$location', 'Global', function ($scope, $http, $location, Global) {
    $scope.global = Global;
    $scope.errors = [];
    $scope.loading = false;
    $scope.submit = function(model, form){
        if(form.$valid && !$scope.loading){
            $scope.loading = true;
            $scope.errors = [];
            $http.post('/users', model).
                success(function(data /*, status, headers, config*/) {
                    if(data.User){
                        Global.setUser(data.User);
                        $location.path( '/' );
                    } else {
                        $scope.errors.push(data);
                    }
                    $scope.loading = false;
                }).
                error(function(data /*, status, headers, config*/) {
                    $scope.errors.push(data);
                    $scope.loading = false;
                });
        }
    };
}]);