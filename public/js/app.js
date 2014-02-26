'use strict';

angular.module('underscore', []).factory('underscore', function() { return window._; });
angular.module('color', []).factory('color', function() { return window.net.brehaut.Color; });

angular.module('trackerui', ['ngCookies', 'ngResource', 'LocalStorageModule', 'toaster', 'ui.router', 'ui.bootstrap', 'trackerui.system', 'trackerui.directives', 'ngClipboard']);
angular.module('trackerui.system', []);
angular.module('trackerui.directives', ['d3', 'underscore', 'color', 'Point2D', 'Intersection']);

angular.module('trackerui').run(['$rootScope', '$state', '$stateParams', 'StateService', 'toaster',
    function ($rootScope, $state, $stateParams, StateService, toaster) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.$on('$stateChangeError', function(/*e, to*/) {
            toaster.pop('error', 'Some error!', 'has occured!!!');
            $state.go( 'index' );
        });
        $rootScope.$on('$stateChangeStart', function(e, to) {
            if (!(to.data&&angular.isFunction(to.data.rule))) return;
            var result = to.data.rule(StateService);

            if (result && result.to) {
                e.preventDefault();
                $state.go(result.to, result.params, result.options);
            }
        });
    }
]);

