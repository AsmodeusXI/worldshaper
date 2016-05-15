(function () {
    'use strict';

    angular
        .module('worldshaper.user')
        .controller('userCtrl', userCtrl);

    userCtrl.$inject = ['userSvc', '$localStorage', '$state'];

    function userCtrl(userSvc, $localStorage, $state) {

        /* jshint validthis: true */
        var vm = this;

        vm.model = {
            message: null,
            newUser: {
                username: null,
                password: null
            },
            toLoginUser: {
                username: null,
                password: null
            }
        };
        vm.loginUser = loginUser;
        vm.createUser = createUser;
        vm.logoutUser = logoutUser;

        function loginUser() {
            userSvc.loginUser(vm.model.toLoginUser.username, vm.model.toLoginUser.password)
                    .then(function (response) {
                        //TODO: Pass to $scope.$storage ?
                        $localStorage.token = response.data.local.token;
                        $localStorage.user = response.data;
                        $state.go('monsters');
                    })
                    .catch(function (response) {
                        console.log('Error: loginUser');
                    })
                    .finally(function () {
                        vm.model.toLoginUser = null;
                    });
        }

        function createUser() {
            userSvc.createUser(vm.model.newUser.username, vm.model.newUser.password)
                    .then(function (response) {
                        vm.model.message = 'New user "' + response.data.local.username + '" created!';
                    })
                    .catch(function (response) {
                        console.log('Error: createUser');
                    })
                    .finally(function () {
                        vm.model.newUser = null;
                    });
        }

        function logoutUser() {
            userSvc.logoutUser($localStorage.user._id)
                    .then(function (response) {
                        vm.model.message = response.data.message;
                    })
                    .catch(function (error) {
                        console.log('Error: logoutUser');
                        console.log(error);
                    })
                    .finally(function () {
                        $localStorage.token = null;
                    });
        }

    }

})();
