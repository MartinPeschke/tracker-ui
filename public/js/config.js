'use strict';

//Setting up route
angular.module('trackerui').config(['$stateProvider',
    function ($stateProvider) {

        $stateProvider

            .state('auth', {
                abstract: true,
                templateUrl: 'views/auth/layout.html'
            })
            .state('auth.signin', {
                url: '/signin',
                templateUrl: 'views/auth/signin.html'
            })
            .state('auth.pwdforgot', {
                url: '/pwdforgot',
                templateUrl: 'views/auth/pwdforgot.html'
            })
            .state('auth.pwdreset', {
                url: '/pwdreset/:token',
                templateUrl: 'views/auth/pwdreset.html'
            })

            .state('signup', {
                abstract: true,
                url: '/signup',
                templateUrl: 'views/signup/workflow.html',
                data: {
                    steps : ['company', 'account', 'events', 'code']
                }
            })
            .state('signup.start', {
                url: '',
                templateUrl: 'views/signup/company.html',
                data: {step: 'company'}
            })
            .state('signup.step', {
                url: '/:step',
                templateUrl: function (stateParams) {
                    return 'views/signup/' + stateParams.step + '.html';
                },
                data: {rule: function(state){
                    if(!state.isAuthenticated()) return {to:'signup.start'};
                }}
            })

            .state('index', {
                url: '',
                templateUrl: 'views/index.html'
            });
    }
]);

//Setting HTML5 Location Mode
angular.module('trackerui').config(['$locationProvider',
    function ($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);