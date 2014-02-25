'use strict';

(function() {
    describe('trackerui controllers', function() {
        describe('SigninController', function() {

            var authServiceMock = {}, scope, signinController, stateService, router;

            beforeEach(module('trackerui'));
            beforeEach(function(){

                module(function($provide) {
                    $provide.value('AuthService', authServiceMock);
                    // rootScope.apply combined with ui-router will crash this otherwise.
                    $provide.value('$httpBackend', function(){});
                });
            });

            beforeEach(inject(function($controller, $rootScope, $q, StateService, $state){
                authServiceMock.authenticateUser = function(email, password){
                    var deferred = $q.defer();
                    deferred.resolve(email=='mapa@friendfund.com');
                    return deferred.promise;
                };
                spyOn(authServiceMock, "authenticateUser").andCallThrough();

                router = $state;
                spyOn(router, "go").andReturn(null);

                stateService = StateService;
                scope = $rootScope.$new();
                signinController = $controller('SigninController', {
                    $scope: scope
                });
            }));

            describe('submit', function() {
                it("will Login user with correct info!", function(){
                    var req = {email:'mapa@friendfund.com', pwd:'mapa'};
                    scope.submit(req, {'$valid':true});

                    scope.$apply();
                    expect(authServiceMock.authenticateUser).toHaveBeenCalledWith('mapa@friendfund.com', 'mapa');
                    expect(router.go).toHaveBeenCalledWith('index');
                });

                it("will not Login user with wrong info!", function(){
                    var req = {email:'false@login.com', pwd:'mapa'};
                    scope.submit(req, {'$valid':true});
                    scope.$apply();
                    expect(scope.errors.length).toBe(1);
                    expect(router.go).not.toHaveBeenCalled();
                });

            });
        });
    });
})();