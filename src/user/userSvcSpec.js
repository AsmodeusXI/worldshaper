(function () {
    'use strict';

    describe('userSvc', function () {

        var userSvc, $httpBackend, env;
        beforeEach(module('worldshaper.user'));
        beforeEach(inject(function(_userSvc_,_$httpBackend_,_ENV_) {
            userSvc = _userSvc_;
            $httpBackend = _$httpBackend_;
            env = _ENV_;
        }));

        describe('#loginUser', function () {
            it('should call a POST to the realmshaper-user/permitted-users API', function () {
                var loggedInUser, responseStatus;
                var toLoginUser = {
                    username: 'test-user',
                    password: 'test-password'
                };
                var toLoginResponse = {
                    _id: 111,
                    local: {
                        username: 'test-user',
                        password: 'test-password',
                        token: 'test-token',
                        tokenTime: new Date()
                    },
                    isAdmin: false
                };
                $httpBackend.expectPOST(env.realmshaperUserApi + '/permitted-users', toLoginUser).respond(201, toLoginResponse);
                userSvc.loginUser('test-user', 'test-password').then(function (response) {
                    loggedInUser = response.data;
                    responseStatus = response.status;
                });
                $httpBackend.flush();
                expect(responseStatus).toEqual(201);
                expect(loggedInUser.local.username).toEqual('test-user');
                expect(loggedInUser.local.password).toEqual('test-password');
            });
        });

        describe('#createUser', function () {
            it('should call a POST to the realmshaper-user/users API', function () {
                var createdUser, responseStatus;
                var toCreateUser = {
                    username: 'test-user',
                    password: 'test-password'
                };
                var toCreateResponse = {
                    _id: 111,
                    local: {
                        username: 'test-user',
                        password: 'test-password',
                        token: null,
                        tokenTime: null
                    },
                    isAdmin: false
                };
                $httpBackend.expectPOST(env.realmshaperUserApi + '/users', toCreateUser).respond(201, toCreateResponse);
                userSvc.createUser('test-user', 'test-password').then(function (response) {
                    createdUser = response.data;
                    responseStatus = response.status;
                });
                $httpBackend.flush();
                expect(responseStatus).toEqual(201);
                expect(createdUser.local.username).toEqual('test-user');
                expect(createdUser.local.password).toEqual('test-password');
            });
        });

    });

})();
