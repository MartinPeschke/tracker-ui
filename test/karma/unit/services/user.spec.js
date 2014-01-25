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
                user_service.set(null);
                expect(user_service.isAuthenticated()).toBe(false);
            });
            it('isAnon = true when Company without user', function() {
                user_service.set({name:'hulk'});
                expect(user_service.isAuthenticated()).toBe(false);
            });
            it('isAnon = false when Company with user', function() {
                user_service.set({
                        'Id' : 'users/2',
                        'Name' : 'maropa@',
                        'Email' : 'maropa@friendfund.com',
                        'Pwd' : 'maropa2M',
                        'Role' : null,
                        'CompanyReference' : {
                            'Id' : 'companies/65',
                            'Name' : 'COMPANY CORP'
                        },
                        'PwdForgetTokens' : null
                    });
                expect(user_service.data.Id).toBe('users/2');
                expect(user_service.isAuthenticated()).toBe(true);
            });

        });
    });
})();