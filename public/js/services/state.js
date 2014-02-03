'use strict';

//Global service for global variables
angular.module('trackerui.system').factory('StateService', ['$http', 'localStorageService',
    function($http, localStorageService) {

        var _user = localStorageService.get('State.User')||{},
            _account = localStorageService.get('State.Account')||{},
            deepObjectExtend = function(ref, mem_key){
                return function(data){
                    for (var prop in data)
                        if (prop in ref)
                            deepObjectExtend(ref[prop], data[prop]);
                        else
                            ref[prop] = data[prop];
                    localStorageService.set(mem_key, ref);
                    return ref;
                };
            },
            logout = function(){
                _user = {};
                _account = {};
                return localStorageService.clearAll();
            },
            setUser = deepObjectExtend(_user, 'State.User'),
            setAccount = deepObjectExtend(_account, 'State.Account');

        return {
                user: _user,
                account: _account,
                setUser: setUser,
                setAccount: setAccount,
                logout: logout,
                isAuthenticated: function(){return !!_user.Id;},
                isSignupComplete: function(){return false;}
            };
    }
]);
