'use strict';

//Global service for global variables
angular.module('trackerui.system').factory('StateService', ['localStorageService',
    function(localStorageService) {
        return {
                user: localStorageService.get('State.User')||{},
                account: localStorageService.get('State.Account')||{},
                setUser: function(u){
                    this.user = u;
                    localStorageService.set('State.User', u);
                },
                setAccount: function(a){
                    this.account = a;
                    localStorageService.set('State.Account', a);
                },
                logout: function(){
                    this.user = {};
                    this.account = {};
                    return localStorageService.clearAll();
                },
                isAuthenticated: function(){return this.user?!!this.user.Id:false;}
            };
    }
]);
