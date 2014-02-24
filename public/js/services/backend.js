'use strict';

//Global service for global variables
angular.module('trackerui.system').factory('BackendService', ['$rootScope', '$http', '$q', 'toaster',
    function ($rootScope, $http, $q, toaster) {
        $rootScope._LOADING_ = false;
        return {
            post: function (path, data, success, error) {
                error = error || function (title, msg) {
                    return function() {
                        toaster.pop('error', title, msg);
                    };
                };
                $rootScope._LOADING_ = true;
                $http.post('/api/0.0.1' + path, data)
                    .success(function (data) {
                        if (data.Status === '0') {
                            success(data);
                        } else {
                            error('Api Error ' + data.Status, data.ErrorMessage)(data);
                        }
                    })
                    .error(error('Network error!', 'Cannot reach backend, whats up?'))['finally'](function () {
                    $rootScope._LOADING_ = false;
                });
            }
        };
    }
]);
