'use strict';

//Global service for global variables
angular.module('trackerui.system').factory('UserService', ['$window',
    function($window) {
        var _data = {},
            deepObjectExtend = function(user){
                for (var prop in user)
                    if (prop in _data)
                        deepObjectExtend(_data[prop], user[prop]);
                    else
                        _data[prop] = user[prop];
                return _data;
            };
        deepObjectExtend($window.User);

        return {
                data: _data,
                set: deepObjectExtend,
                isAuthenticated: function(){return !!_data.Id;}
            };
    }
]);
