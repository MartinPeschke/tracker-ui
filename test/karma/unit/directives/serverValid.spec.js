'use strict';

(function() {
    describe('trackerui controllers', function() {
        describe('serverValid', function() {
            // Load the controllers module
            beforeEach(module('trackerui'));

            var element, scope, compile, defaultData, httpBackend,
              validTemplate = '<input name="email" ng-model="email" data-server-valid="/checkemail">';

            beforeEach(function () {
                defaultData = {email:'mapa@friendfund.com'};
                inject(function ($httpBackend, $rootScope, $compile) {
                    compile = $compile;
                    scope = $rootScope.$new();
                    httpBackend = $httpBackend;
                });
            });
            afterEach(function() {
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
            });


            function createDirective(data, template) {
                var el;
                scope.data = data || defaultData;
                el = compile(template || validTemplate)(scope);
                return el;
            }

            it('directive should call server to gather state', function() {
                element = createDirective();
                expect(scope.url).toBe('/checkemail');
            });
        });
    });
})();