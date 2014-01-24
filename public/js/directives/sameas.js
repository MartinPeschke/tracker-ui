'use strict';

angular.module('trackerui.directives')
    .directive('sameAs', function() {
        return {
            require: 'ngModel',
            scope: {
                sameAs: '='
            },
            link: function(scope, element, attrs, ctrl) {
                scope.$watch(function() {
                    var combined;

                    if (scope.sameAs || ctrl.$viewValue) {
                        combined = scope.sameAs + '_' + ctrl.$viewValue;
                    }
                    return combined;
                }, function(value) {
                    if (value) {
                        ctrl.$parsers.unshift(function(viewValue) {
                            var origin = scope.sameAs;
                            if (origin !== viewValue) {
                                ctrl.$setValidity('sameAs', false);
                                return undefined;
                            } else {
                                ctrl.$setValidity('sameAs', true);
                                return viewValue;
                            }
                        });
                    }
                });
            }
        };
    });