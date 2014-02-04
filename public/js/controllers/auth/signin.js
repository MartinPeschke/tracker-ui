'use strict';

angular.module('trackerui.system').controller('SigninController', ['$scope', '$http', '$state', 'StateService',
    function ($scope, $http, $state, State) {

        $scope.errors = [];
        $scope.loading = false;
        $scope.submit = function(loginReq, form){
            if(form.$valid && !$scope.loading){
                $scope.errors = [];
                $scope.loading = true;
                $http.post('/api/0.0.1/web/user/login', loginReq)
                    .success(function(data /*, status, headers, config*/) {
                        State.setUser(data.User);
                        if(State.isAuthenticated()){
                            $state.go( 'index' );
                        } else {
                            $scope.errors.push('Unknown Email or Login');
                        }
                        $scope.loading = false;
                    })
                    .error(function(/* data, status, headers, config */) {
                        $scope.errors.push('Unknown Email or Login');
                        $scope.loading = false;
                    });
            }
        };
    }
]);