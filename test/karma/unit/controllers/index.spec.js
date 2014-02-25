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
            it('should expose basic 3 circle info', function() {
                expect(scope.d3Data.length).toBe(3);
                expect(scope.d3Data[0].id).toBe(1);
            });
        });
    });
})();