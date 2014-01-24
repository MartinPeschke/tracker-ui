'use strict';

//Global service for global variables
angular.module('trackerui.system').factory('Global', [
    function() {
        var _company = window.Company||{},
            _user = {},
            setUser = function(user){
                for(var prop in user){
                    _user[prop] = user[prop];
                }
            },
            setUserFromCompany = function(company, n){
                var user;
                if(company&&company.Users&&company.Users.length>0){
                    user = company.Users[n||0];
                    setUser(user);
                }
                return user;
            };
        setUserFromCompany(_company);

        return {
                user: _user,
                company: _company,
                setUser: setUser,
                setUserFromCompany: setUserFromCompany
            };
    }
]);
