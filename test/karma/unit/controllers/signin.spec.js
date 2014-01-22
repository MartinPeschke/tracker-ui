'use strict';

(function() {
    describe('trackerui controllers', function() {
        describe('SigninController', function() {
            // Load the controllers module
            beforeEach(module('trackerui'));

            var httpBackend, SigninController, scope, location;

            beforeEach(inject(function($httpBackend, $controller, $rootScope, $location) {
                location = $location;
                httpBackend = $httpBackend;
                httpBackend.when('POST', '/users/session').respond({User:{Id: '1'}});
                scope = $rootScope.$new();
                SigninController = $controller('SigninController', {
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
                expect(scope.submit({}, form)).toBeFalsy();
            });
            it('should send if form valid', function() {
                var form = {$valid : true};
                expect(scope.submit({email:"mapa@hackandcraft.com", pwd:"mapa"}, form)).toBeFalsy();
                httpBackend.expectPOST('/users/session');
                httpBackend.flush();
                expect(location.path()).toBe('/');

            });

        });
    });
})();