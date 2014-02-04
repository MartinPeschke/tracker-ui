'use strict';

(function() {
    describe('trackerui controllers', function() {
        describe('SigninController', function() {
            // Load the controllers module
            beforeEach(module('stateMock'));
            beforeEach(module('trackerui'));

            var httpBackend, SigninController, scope, uistate;

            beforeEach(inject(function($httpBackend, $controller, $rootScope, $state) {
                uistate = $state;
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

            var user = {email:'mapa@hackandcraft.com', pwd:'mapa'},
                error = {'errorMessage':'ERROR'},
                valid_reply = {
                    'DbMessage' : null,
                    'Status' : '0',
                    'ErrorMessage' : null,
                    'EndPoint' : '/0.0.1/web/user/signup',
                    'User' : {
                        'Id' : 'users/1',
                        'Name' : 'maropa@',
                        'Email' : 'maropa@friendfund.com',
                        'Pwd' : 'maropa2M',
                        'Role' : null,
                        'CompanyReference' : {
                            'Id' : 'companies/65',
                            'Name' : 'COMPANY CORP'
                        },
                        'PwdForgetTokens' : null
                    }
                };

            it('should start out non loading', function() {
                expect(scope.loading).toBe(false);
            });
            it('should not send if form invalid', function() {
                var form = {$valid : false};
                expect(scope.submit({}, {}, form)).toBeFalsy();
            });
            it('should signup successfully', function() {
                var form = {$valid : true};
                expect(scope.submit(user, form)).toBeFalsy();
                httpBackend.expectPOST('/users/session').respond(200, valid_reply);
                httpBackend.flush();
                expect(location.path()).toBe('/');
            });
            it('should push out error, if signup not successful', function() {
                var form = {$valid : true};
                expect(scope.submit(user, form)).toBeFalsy();
                httpBackend.expectPOST('/users/session').respond(200, error);
                httpBackend.flush();
                expect(scope.errors[0]).toBeTruthy();
            });
            it('should push out error, if network failure', function() {
                var form = {$valid : true};
                expect(scope.submit(user, form)).toBeFalsy();
                httpBackend.expectPOST('/users/session').respond(500, error);
                httpBackend.flush();
                expect(scope.errors[0]).toBeTruthy();
            });


        });
    });
})();