'use strict';

(function() {
    describe('trackerui controllers', function() {
        describe('IndexController', function() {
            // Load the controllers module
            beforeEach(module('stateMock'));
            beforeEach(module('trackerui'));

            var scope, IndexController;

            beforeEach(inject(function($controller, $rootScope) {
                scope = $rootScope.$new();

                IndexController = $controller('IndexController', {
                    $scope: scope
                });
            }));
            it('should expose numerical information scope', function() {
                expect(scope.distance).toBeGreaterThan(0);
                expect(scope.radius).toBeGreaterThan(0);
            });
        });
    });
})();