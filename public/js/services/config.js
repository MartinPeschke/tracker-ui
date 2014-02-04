'use strict';

//Global service for global variables
angular.module('trackerui.system').factory('ConfigService', ['$http', '$q',
    function($http, $q) {
        var deferred = $q.defer();
        $http.post('/api/0.0.1/web/config', {})
            .success(function(data){
                deferred.resolve(data.Config);
            })
            .error(function(){
                deferred.reject('An error occured while fetching items');
            });
        return deferred.promise;
    }
]);
