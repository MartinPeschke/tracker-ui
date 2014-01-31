'use strict';

//Setting up route
angular.module('trackerui').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('auth', {
                abstract:true,
                templateUrl:'views/auth/layout.html'
            })
            .state('auth.signin', {
                url: '/signin',
                templateUrl: 'views/auth/signin.html'
            })
            .state('auth.signup', {
                url: '/signup',
                templateUrl: 'views/auth/signup.html'
            })
            .state('auth.pwdforgot', {
                url:'/pwdforgot',
                templateUrl: 'views/auth/pwdforgot.html'
            })
            .state('auth.pwdreset', {
                url: '/pwdreset/:token',
                templateUrl: 'views/auth/pwdreset.html'
            })
            .state('index', {
                url:'/',
                templateUrl: 'views/index.html'
            });
    }
]);

//Setting HTML5 Location Mode
angular.module('trackerui').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);