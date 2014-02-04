'use strict';

// Karma configuration
// Generated on Sat Oct 05 2013 22:00:14 GMT+0700 (ICT)




module.exports = function(config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '../../',


        // frameworks to use
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'public/lib/underscore/underscore-min.js',
            'public/lib/colorjs/color.js',
            'public/lib/angular/angular.js',
            'public/lib/angular-mocks/angular-mocks.js',
            'public/lib/angular-cookies/angular-cookies.js',
            'public/lib/angular-animate/angular-animate.min.js',
            'public/lib/angular-resource/angular-resource.js',

            'public/lib/angular-local-storage/angular-local-storage.min.js',
            'public/lib/angular-ui-router/release/angular-ui-router.min.js',
            'public/lib/angular-notify-toaster/toaster.js',
            'public/lib/angular-bootstrap/ui-bootstrap.js',
            'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',


            'public/lib/d3-angular/d3.js',
            'public/lib/d3-angular/point2d.js',
            'public/lib/d3-angular/polynomial.js',
            'public/lib/d3-angular/intersection.js',

            'public/js/app.js',
            'public/js/config.js',
            'public/js/filters.js',
            'public/js/directives/paint.js',
            'public/js/directives/sameas.js',
            'public/js/directives/servervalid.js',

            'public/js/services/backend.js',
            'public/js/services/state.js',
            'public/js/services/config.js',
            'public/js/services/auth.js',

            'public/js/controllers/index.js',
            'public/js/controllers/header.js',

            'public/js/controllers/auth/signin.js',
            'public/js/controllers/auth/pwdforgot.js',
            'public/js/controllers/auth/pwdreset.js',

            'public/js/controllers/signup/workflow.js',
            'public/js/controllers/signup/company.js',
            'public/js/controllers/signup/account.js',
            'public/js/controllers/signup/events.js',
            'public/js/controllers/signup/codes.js',

            'public/js/init.js',

            'test/karma/mocks/*.js',
            'test/karma/unit/**/*.js'
        ],


        // list of files to exclude
        exclude: [
        ],


        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        //reporters: ['progress'],
        reporters: ['progress', 'coverage'],

        // coverage
        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'public/js/controllers/*.js': ['coverage'],
            'public/js/services/*.js': ['coverage'],
            'public/js/directives/*.js': ['coverage']
        },

        coverageReporter: {
            type: 'html',
            dir: 'test/coverage/'
        },

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    });
};