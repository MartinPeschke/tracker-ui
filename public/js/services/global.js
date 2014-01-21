'use strict';

//Global service for global variables
angular.module('trackerui.system').factory('Global', [
    function() {
        var _user = window.user||{};

        return {
            user: _user,
            setUser: function(user){
                for(var prop in user){
                    _user[prop] = user[prop];
                }
            }
        };
    }
]);
