'use strict';

(function() {
    describe('TrackerUI controllers', function() {
        describe('HeaderController', function() {
            // Load the controllers module
            beforeEach(module('trackerui'));

            var scope, HeaderController;

            beforeEach(inject(function($controller, $rootScope) {
                scope = $rootScope.$new();
                HeaderController = $controller('HeaderController', {
                    $scope: scope
                });
            }));

            it('should expose a user object globally', function() {

                expect(scope.user).toBeTruthy();

            });

            it('setting user should set authenticated to true', function() {

                scope.user.Id = 1;
                scope.$apply();
                expect(scope.authenticated).toBe(true);

            });


        });
    });
})();