'use strict';

//Global service for global variables
angular.module('trackerui.system').factory('AuthService', ['$q', 'BackendService', 'StateService',
    function($q, backend, State) {
        return {
            authenticateUser: function(email, password){
                var deferred = $q.defer();
                backend.post('/web/user/login', {email: email, pwd: password},
                    function success(data){
                        State.setUser(data.User);
                        if(State.isAuthenticated())
                            deferred.resolve(true);
                        else
                            deferred.resolve(false);
                    }
                );
                return deferred.promise;
            },
            createUser: function(newUserData){
                var deferred = $q.defer();
                backend.post('/web/user/signup', newUserData,
                    function success(data /*, status, headers, config*/) {
                        State.setUser(data.User);
                        if(State.isAuthenticated())
                            deferred.resolve(true);
                        else
                            deferred.resolve(false);
                    });
                return deferred.promise;
            }
        };
    }
]);
