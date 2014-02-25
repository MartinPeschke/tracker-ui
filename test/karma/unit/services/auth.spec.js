'use strict';

(function() {
    describe('trackerui services', function() {
        describe('AuthService', function() {

            var stateService, backendMock, callSpy, authService, rootScope, httpBackend;

            beforeEach(module('trackerui'));

            beforeEach(function(){
                backendMock = {post:function(){}};
                module(function($provide) {
                    $provide.value('BackendService', backendMock);
                    // rootScope.apply combined with ui-router will crash this otherwise.
                    $provide.value('$httpBackend', function(){});
                 });
            });

            beforeEach(inject(function($rootScope, StateService, AuthService, BackendService) {
                rootScope = $rootScope;
                stateService = StateService;
                authService = AuthService;
                backendMock = BackendService;
            }));

            describe('createUser', function(){
                var setupBackendMock = function(server_resp_fake){
                    backendMock.post = function(url, data, success, error){
                        success({"User":angular.extend(server_resp_fake, data)});
                    };
                    spyOn(backendMock, 'post').andCallThrough();

                    callSpy = {afterSignup: function(){}};
                    spyOn(callSpy, 'afterSignup').andCallThrough();

                    return backendMock
                };
                it('should log user in when createUser is called and server returns user id', function() {

                    var user_fake = {NEW_DATA:1};
                    setupBackendMock({"Id":"users/1"});

                    authService.createUser(user_fake)
                        .then(callSpy.afterSignup);

                    rootScope.$apply();
                    expect(stateService.isAuthenticated()).toBe(true);
                    expect(callSpy.afterSignup).toHaveBeenCalledWith(true);
                });

                it('should not log user in when createUser is called and server returns not user id', function() {

                    var user_fake = {NEW_DATA:1};
                    setupBackendMock({});

                    authService.createUser(user_fake)
                        .then(callSpy.afterSignup);

                    rootScope.$apply();
                    expect(stateService.isAuthenticated()).toBe(false);
                    expect(callSpy.afterSignup).toHaveBeenCalledWith(false);
                });

            });


            describe('authenticateUser', function(){

                beforeEach(function(){
                    backendMock.post = function(url, data, success, error){
                        if(data.email == 'mapa@friendfund.com'){
                            success({"Status":"0", "User":{"Name":"Mapa", "Id":"users/1"}});
                        } else {
                            success({"DbMessage":"Wrong_info", "User":null});
                        }
                    };
                    spyOn(backendMock, 'post').andCallThrough();

                    callSpy = {afterLogin: function(){}};
                    spyOn(callSpy, 'afterLogin').andCallThrough();


                });

                it('should log user in when email is correct and server returns user id', function() {

                    authService.authenticateUser("mapa@friendfund.com", "mapa")
                        .then(callSpy.afterLogin);

                    rootScope.$apply();
                    expect(stateService.isAuthenticated()).toBe(true);
                    expect(callSpy.afterLogin).toHaveBeenCalledWith(true);
                });

                it('should not log user in when email is incorrect and server returns message', function() {

                    authService.authenticateUser("ernst@young.com", "mapa")
                        .then(callSpy.afterLogin);

                    rootScope.$apply();
                    expect(stateService.isAuthenticated()).toBe(false);
                    expect(callSpy.afterLogin).toHaveBeenCalledWith(false);
                });

            });
        });
    });
})();