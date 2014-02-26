'use strict';

//Global service for global variables
angular.module('trackerui.system').factory('BackendService', ['$rootScope', '$http', 'toaster',
    function ($rootScope, $http, toaster) {
        $rootScope._LOADING_ = false;
        return {
            post: function (path, data, success, error) {
                var wrap_error = function (title, msg) {
                    return function(data, status, headers, config) {
                        if(error){
                            error(title, msg, data, status, headers, config)
                        } else {
                            toaster.pop('error', title, msg);
                        }
                    };
                };
                $rootScope._LOADING_ = true;
                $http.post('http://bizintell.cloudapp.net:12345/0.0.1' + path, data)
                    .success(function (data, status, headers, config) {
                        if (data.Status === '0') {
                            if(success)success(data);
                        } else {
                            wrap_error('Api Error ' + data.Status, data.ErrorMessage)(data, status, headers, config);
                        }
                    })
                    .error(
                        wrap_error('Network error!', 'Cannot reach backend, whats up?')
                    )
                    ['finally'](function () {
                        $rootScope._LOADING_ = false;
                    });
            }
        };
    }
]);
