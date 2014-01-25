'use strict';

//Setting up route
angular.module('trackerui').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/signin', {
            templateUrl: 'views/signin.html'
        }).
        when('/signup', {
            templateUrl: 'views/signup.html'
        }).
        when('/pwdforgot', {
            templateUrl: 'views/pwdforgot.html'
        }).
        when('/pwdreset/:token', {
            templateUrl: 'views/pwdreset.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('trackerui').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);