'use strict';

//Global service for global variables
angular.module('trackerui.system').factory('BackendService', ['$rootScope', '$http', '$q', 'toaster',
    function($rootScope, $http, $q, toaster) {
        $rootScope._LOADING_ = false;
        return {
            post: function(path, data, success, error){
                $rootScope._LOADING_ = true;
                $http.post('/api/0.0.1'+path, data)
                    .success(success)
                    .error(error||function(){
                        toaster.pop('error', 'Network error!', 'Cannot reach baclkend, whats up?');
                    })['finally'](function(){$rootScope._LOADING_ = false;});
            }
        };
    }
]);
