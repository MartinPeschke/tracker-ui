'use strict';

//Setting up route with https://github.com/angular-ui/ui-router
angular.module('trackerui').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider

            .state('auth', {
                abstract: true,
                templateUrl: 'views/auth/layout.html'
            })
            .state('auth.signin', {
                url: '/signin',
                templateUrl: 'views/auth/signin.html',
                data: {rule: function(state){
                    if(state.isAuthenticated()) return {to:'index'};
                }}
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
                    steps : [
                        {key:'company', label: 'Sign Up', description:'Lorem Ipsum long winded for signup', cart:false, workflow:true},
                        {key:'account', label: 'Create Account', description:'Lorem Ipsum long winded for account', cart:false, workflow:true},
                        {key:'events', label: 'Select Events', description:'Lorem Ipsum long winded for event create', cart:true, workflow:true},
                        {key:'mastercode', label: 'Master Script', description:'Lorem Ipsum long winded for master script', cart:true, workflow:true},
                        {key:'codes', label: 'Integrate Tracking', description:'Lorem Ipsum long winded for integration', cart:true, workflow:true},
                        {key:'subscription', label: 'Choose subscription level', description:'', cart:true, workflow:false}
                    ],
                    rule: function(state){
                        if(state.isAuthenticated()) return {to:'index'};
                    }
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
                // see for rules: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#wiki-how-to-create-rules-to-prevent-access-to-a-state
                data: {rule: function(state){
                    if(!state.isAuthenticated()) return {to:'signup.start'};
                }}
            })

             .state('faq', {
                url: '/faq',
                templateUrl: 'views/static/layout.html'
            })
            .state('faq.android', {
                url: '/android',
                templateUrl: 'views/static/android.html'
            })
            .state('faq.iphone', {
                url: '/iphone',
                templateUrl: 'views/static/android.html'
            })
            .state('faq.windows', {
                url: '/windows',
                templateUrl: 'views/static/android.html'
            })
            .state('faq.website', {
                url: '/website',
                templateUrl: 'views/static/website.html'
            })

            .state('index', {
                url: '/',
                templateUrl: 'views/index.html'
            });
    }
]);

//Setting HTML5 Location Mode
angular.module('trackerui').config(['$httpProvider', '$locationProvider',
    function ($httpProvider, $locationProvider) {
        $locationProvider.hashPrefix('!');
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.common['Client-Token'] = '1234asdf23t523f5ya';
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);