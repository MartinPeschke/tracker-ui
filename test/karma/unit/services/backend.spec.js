'use strict';

(function() {
    describe('trackerui services', function() {
        describe('BackendService', function() {
            // Load the controllers module
            beforeEach(module('trackerui'));

            var httpBackend, backendService, root_scope, toaster_mock, callSpy;

            beforeEach(inject(function($httpBackend, $rootScope, BackendService, toaster) {
                root_scope = $rootScope;
                httpBackend = $httpBackend;
                toaster_mock = toaster;
                backendService = BackendService;
                httpBackend.whenGET("views/index.html").respond(200, '<html></html>');

                callSpy = {success : function(){}, error: function(){}};
                spyOn(callSpy, 'success').andCallThrough();
                spyOn(callSpy, 'error').andCallThrough();
                spyOn(toaster_mock, 'pop').andReturn(null);
            }));

            afterEach(function() {
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
            });

            var error_reply = {'Status':'-1', 'ErrorMessage':'ERROR'},
                db_msg_reply = {'Status':'0', 'ErrorMessage':null, 'DbMessage': 'SOME_IMPORTANT_THING'},
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

            it('query the specified api endpoint with prefix', function() {

                httpBackend.expectPOST('/api/0.0.1/user/login').respond(200, valid_reply);
                backendService.post("/user/login", {});
                httpBackend.flush();
            });

            it('should set global _LOADING_ status accordingly', function() {

                httpBackend.expectPOST('/api/0.0.1/user/login').respond(200, valid_reply);
                backendService.post("/user/login", {});
                expect(root_scope._LOADING_).toBe(true);
                httpBackend.flush();
                expect(root_scope._LOADING_).toBe(false);
            });

            it('should call success, if call is successful', function() {

                httpBackend.expectPOST('/api/0.0.1/user/login').respond(200, valid_reply);
                backendService.post("/user/login", {}, callSpy.success, callSpy.error);
                httpBackend.flush();
                expect(callSpy.success).toHaveBeenCalledWith(valid_reply);
                expect(callSpy.error).not.toHaveBeenCalled();
            });

            it('should show Toaster when API returns httpError 500', function() {

                httpBackend.expectPOST('/api/0.0.1/user/login').respond(500, valid_reply);
                backendService.post("/user/login", {}, callSpy.success);
                httpBackend.flush();
                expect(toaster_mock.pop).toHaveBeenCalled();
                expect(callSpy.success).not.toHaveBeenCalled();
            });

            it('should show Toaster when API returns http 200 with invalid JSON', function() {

                httpBackend.expectPOST('/api/0.0.1/user/login').respond(200, '');
                backendService.post("/user/login", {}, callSpy.success);
                httpBackend.flush();
                expect(toaster_mock.pop).toHaveBeenCalled();
                expect(callSpy.success).not.toHaveBeenCalled();
            });


            it('should show Toaster when API returns http 200 with errorMessage', function() {

                httpBackend.expectPOST('/api/0.0.1/user/login').respond(200, error_reply);
                backendService.post("/user/login", {}, callSpy.success);
                httpBackend.flush();
                expect(toaster_mock.pop).toHaveBeenCalled();
                expect(callSpy.success).not.toHaveBeenCalled();
            });

            it('should call success when API returns http 200 with DbMessage', function() {

                httpBackend.expectPOST('/api/0.0.1/user/login').respond(200, db_msg_reply);
                backendService.post("/user/login", {}, callSpy.success);
                httpBackend.flush();
                expect(callSpy.success).toHaveBeenCalledWith(db_msg_reply);
                expect(toaster_mock.pop).not.toHaveBeenCalled();
            });

        });
    });
})();