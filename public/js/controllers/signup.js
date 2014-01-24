'use strict';

angular.module('trackerui.system').controller('SignupController', ['$scope', '$http', '$location', 'Global', function ($scope, $http, $location, Global) {
    $scope.global = Global;
    $scope.errors = [];
    $scope.loading = false;
    $scope.submit = function(company, user, form){
        if(form.$valid && !$scope.loading){
            $scope.errors = [];
            $scope.loading = true;
            $http.post('/users', {'name':company.name, 'Users':[user]})
                .success(function(data /*, status, headers, config*/) {
                    if(Global.setUserFromCompany(data.Company)){
                        $location.path( '/' );
                    } else {
                        $scope.errors.push(data);
                    }
                    $scope.loading = false;
                })
                .error(function(data /*, status, headers, config*/) {
                    $scope.errors.push(data);
                    $scope.loading = false;
                });
        }
    };
}]);