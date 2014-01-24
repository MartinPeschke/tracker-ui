'use strict';

angular.module('trackerui.system').controller('SignupController', ['$scope', '$http', '$location', 'UserService', function ($scope, $http, $location, User) {

    $scope.errors = [];
    $scope.loading = false;
    $scope.submit = function(company, user, form){
        var companyReq = {'name':company.name, 'Users':[user]};
        if(form.$valid && !$scope.loading){
            $scope.errors = [];
            $scope.loading = true;
            $http.post('/users', companyReq)
                .success(function(data /*, status, headers, config*/) {
                    var user = User.setCompany(data.Company);
                    if(user){
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