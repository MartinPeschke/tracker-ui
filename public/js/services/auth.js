'use strict';

//Global service for global variables
angular.module('trackerui.system').factory('AuthService', ['$http', '$q', 'StateService',
    function($http, $q, State) {
        return {
            authenticateUser: function(email, password){
                var deferred = $q.defer();
                $http.post('/api/0.0.1/web/user/login', {email: email, pwd: password})
                    .success(function(data /*, status, headers, config*/) {
                        State.setUser(data.User);
                        if(State.isAuthenticated())
                            deferred.resolve(true);
                        else
                            deferred.resolve(false);
                    })
                    .error(function(){
                        deferred.reject('Unknown email or password!');
                    });
                return deferred.promise;
            },
            createUser: function(newUserData){
                var deferred = $q.defer();
                $http.post('/api/0.0.1/web/user/signup', newUserData)
                    .success(function(data /*, status, headers, config*/) {
                        State.setUser(data.User);
                        if(State.isAuthenticated())
                            deferred.resolve(true);
                        else
                            deferred.resolve(false);
                    })
                    .error(function(){
                        deferred.reject('An Error Occured!!!');
                    });
                return deferred.promise;
            }
        };
    }
]);
