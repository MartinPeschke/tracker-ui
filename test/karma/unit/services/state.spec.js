'use strict';

(function() {
    describe('trackerui controllers', function() {
        describe('StateService', function() {
            // Load the controllers module
            beforeEach(module('trackerui'));

            var state_service, wndw;

            beforeEach(inject(function($window, StateService) {
                wndw = $window;
                state_service = StateService;
            }));

            it('isAnon = true when no Company in window', function() {
                state_service.setUser(null);
                expect(state_service.isAuthenticated()).toBe(false);
            });
            it('isAnon = true when Company without user', function() {
                state_service.setUser({name:'hulk'});
                expect(state_service.isAuthenticated()).toBe(false);
            });
            it('isAnon = false when Company with user', function() {
                state_service.setUser({
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
                expect(state_service.user.Id).toBe('users/2');
                expect(state_service.isAuthenticated()).toBe(true);
            });

        });
    });
})();