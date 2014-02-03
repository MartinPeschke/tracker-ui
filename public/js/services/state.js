'use strict';

//Global service for global variables
angular.module('trackerui.system').factory('StateService', ['$window',
    function($window) {
        var _user = {},
            _account = {},
            deepObjectExtend = function(ref){
                return function(data){
                    for (var prop in data)
                        if (prop in ref)
                            deepObjectExtend(ref[prop], data[prop]);
                        else
                            ref[prop] = data[prop];
                    return ref;
                };
            },
            setUser = deepObjectExtend(_user),
            setAccount = deepObjectExtend(_account);
        setUser($window.User);

        return {
                user: _user,
                account: _account,
                setUser: setUser,
                setAccount: setAccount,
                isAuthenticated: function(){return !!_user.Id;},
                isSignupComplete: function(){return false;}
            };
    }
]);
