'use strict';

angular.module('trackerui', ['ngCookies', 'ngResource', 'LocalStorageModule', 'ui.router', 'ui.bootstrap', 'trackerui.system', 'trackerui.directives']);

angular.module('underscore', []).factory('underscore', function() { return window._; });
angular.module('color', []).factory('color', function() { return window.net.brehaut.Color; });

angular.module('trackerui.system', []);
angular.module('trackerui.directives', ['d3', 'underscore', 'color', 'Point2D', 'Intersection']);

angular.module('trackerui').run(['$rootScope', '$state', '$stateParams', 'StateService',
    function ($rootScope, $state, $stateParams, StateService) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.$on('stateChangeStart', function(e, to) {
            if (!(to.data&&angular.isFunction(to.data.rule))) return;
            var result = to.data.rule(StateService);

            if (result && result.to) {
                e.preventDefault();
                $state.go(result.to, result.params, result.options);
            }
        });

    }
]);

