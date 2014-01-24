'use strict';

//Global service for global variables
angular.module('trackerui.system').factory('UserService', ['$window',
    function($window) {
        var _data = {},
            setUser = function(user, company){
                for(var prop in user){
                    _data[prop] = user[prop];
                }
                _data.Company = company;
                return _data;
            },
            setCompany = function(company, n){
                var user;
                if(company&&company.Users&&company.Users.length>0){
                    user = company.Users[n||0];
                    user = setUser(user, company);
                }
                return user;
            };
        setCompany($window.Company);

        return {
                data: _data,
                setUser: setUser,
                setCompany: setCompany,
                isAuthenticated: function(){return !!_data.Id;}
            };
    }
]);
