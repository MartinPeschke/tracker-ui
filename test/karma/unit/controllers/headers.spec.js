'use strict';

(function() {
    describe('TrackerUI controllers', function() {
        describe('HeaderController', function() {
            // Load the controllers module
            beforeEach(module('stateMock'));
            beforeEach(module('trackerui'));

            var scope, HeaderController;

            beforeEach(inject(function($controller, $rootScope) {
                scope = $rootScope.$new();
                HeaderController = $controller('HeaderController', {
                    $scope: scope
                });
            }));

            it('should return name as ""', function() {

                expect(scope.getName()).toBe('');

            });

            it('should expose logout function', function() {

                expect(scope.isAuthenticated()).toBe(false);

            });
        });
    });
})();