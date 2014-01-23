'use strict';

(function() {
    describe('trackerui controllers', function() {
        describe('SignupController', function() {
            // Load the controllers module
            beforeEach(module('trackerui'));

            var httpBackend, SignupController, scope, location;

            beforeEach(inject(function($httpBackend, $controller, $rootScope, $location) {
                location = $location;
                httpBackend = $httpBackend;
                scope = $rootScope.$new();
                SignupController = $controller('SignupController', {
                    $scope: scope
                });
            }));
            afterEach(function() {
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
            });

            it('should start out non loading', function() {
                expect(scope.loading).toBe(false);
            });
            it('should not send if form invalid', function() {
                var form = {$valid : false};
                expect(scope.submit({}, {}, form)).toBeFalsy();
            });
            it('should signup successfully', function() {
                var form = {$valid : true},
                    user = {email:'mapa@hackandcraft.com', pwd:'mapa'},
                    company = {'name':'Test Corp!'};
                expect(scope.submit(user, company, form)).toBeFalsy();
                httpBackend.expectPOST('/users').respond(200, {User:{Id: '1'}});
                httpBackend.flush();
                expect(location.path()).toBe('/');
            });
            it('should push out error, if signup not successful', function() {
                var form = {$valid : true},
                    user = {email:'mapa@hackandcraft.com', pwd:'mapa'},
                    company = {'name':'Test Corp!'};
                expect(scope.submit(user, company, form)).toBeFalsy();
                httpBackend.expectPOST('/users').respond(200, {'errorMessage':'ERROR'});
                httpBackend.flush();
                expect(scope.errors[0].errorMessage).toBe('ERROR');
            });


        });
    });
})();