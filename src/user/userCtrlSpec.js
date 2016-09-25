(function () {
  'use strict';

  describe('userCtrl', function () {

    beforeEach(angular.mock.module('worldshaper.user'));

    var _controller,
    _scope,
    _userSvc,
    _state,
    _localStorage;

    beforeEach(inject(function ($controller, $rootScope, $q, userSvc, $localStorage, $state) {
      _scope = $rootScope.$new();
      _userSvc = userSvc;
      _localStorage = $localStorage;
      _state = $state;

      function providePromise(response) {
        return $q.when(response);
      }

      var _loginUserResponse = {
        data: {
          '_id': '1111',
          'local': {
            'username': 'test-user',
            'password': 'test-password',
            'token': 'test-token',
            'tokenTime': new Date()
          },
          'isAdmin': false
        }
      };
      spyOn(_userSvc, 'loginUser').and.callFake(function () {
        return providePromise(_loginUserResponse);
      });

      var _createUserResponse = {
        data: {
          '_id': '2222',
          'local': {
            'username': 'test-user',
            'password': 'test-password',
            'token': null,
            'tokenTime': null
          },
          'isAdmin': false
        }
      };
      spyOn(_userSvc, 'createUser').and.callFake(function () {
        return providePromise(_createUserResponse);
      });

      spyOn(_state, 'go');

      _controller = $controller('userCtrl', {
        $scope: _scope,
        userSvc: _userSvc,
        $localStorage: _localStorage
      });
    }));

    describe('#loginUser', function testLoginUser() {

      it('expect loginUser to keep a token locally', function () {
        _controller.model.toLoginUser = {
          'username': 'test-user',
          'password': 'test-password'
        };
        _controller.loginUser();
        _scope.$apply();
        expect(_userSvc.loginUser).toHaveBeenCalledWith('test-user', 'test-password');
        expect(_state.go).toHaveBeenCalledWith('monsters');
        expect(_localStorage.token).toEqual('test-token');
      });

    });

    describe('#createUser', function testCreateUser() {

      it('expect createUser to call userSvc.createUser', function () {
        _controller.model.newUser = {
          'username': 'test-user',
          'password': 'test-password'
        };
        _controller.createUser();
        _scope.$apply();
        expect(_userSvc.createUser).toHaveBeenCalledWith('test-user', 'test-password');
        expect(_controller.model.message).toEqual('New user "test-user" created!');
      });

    });

  });

})();
