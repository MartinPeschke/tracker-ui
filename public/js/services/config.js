'use strict';

//Global service for global variables
angular.module('trackerui.system').factory('ConfigService', ['$q', 'BackendService',
    function($q, backend) {
        var deferred = $q.defer();
        backend.post('/web/config', {},
            function success(data){
                deferred.resolve(data.Config);
            }
        );
        return deferred.promise;
    }
]);
