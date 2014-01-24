'use strict';

(function() {
    describe('trackerui controllers', function() {
        describe('UserService', function() {
            // Load the controllers module
            beforeEach(module('trackerui'));

            var user_service, wndw;

            beforeEach(inject(function($window, UserService) {
                wndw = $window;
                user_service = UserService;
            }));

            it('isAnon = true when no Company in window', function() {
                expect(user_service.setCompany(null)).toBeFalsy();
                expect(user_service.isAuthenticated()).toBe(false);
            });
            it('isAnon = true when Company without user', function() {
                expect(user_service.setCompany({'Users':[], Id:0})).toBeFalsy();
                expect(user_service.isAuthenticated()).toBe(false);
            });
            it('isAnon = false when Company with user', function() {
                var data = user_service.setCompany({'Users':[{Id:2}], Id:0});
                expect(user_service.data.Id).toBe(2);
                expect(user_service.isAuthenticated()).toBe(true);
            });

        });
    });
})();