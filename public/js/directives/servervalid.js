'use strict';

angular.module('trackerui.directives')
    .directive('serverValid', ['$http', function($http) {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
                var uniqueness;
                scope.url = attrs.serverValid;
                ctrl.$parsers.unshift(function(viewValue){
                    if(viewValue && viewValue.length>3){
                        var opts ={}, my_uniqueness = Math.random();
                        uniqueness = my_uniqueness;
                        opts[attrs.name] = viewValue;

                        $http.get(scope.url, opts)
                            .success(function(data/*, status, headers, config*/){
                                if(my_uniqueness === uniqueness)
                                    ctrl.$setValidity('serverValid', data.success);
                            });
                    }
                    return viewValue;
                });
            }
        };
    }]);