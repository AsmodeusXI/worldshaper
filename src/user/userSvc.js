(function () {
    'use strict';

    angular
        .module('worldshaper.user')
        .factory('userSvc', userSvc);


    function userSvc($http, ENV, $localStorage) {

        var permittedUserUri = ENV.realmshaperUserApi + '/permitted-users';
        var userUri = ENV.realmshaperUserApi + '/users';

        return {
            loginUser: loginUser,
            createUser: createUser,
            logoutUser: logoutUser
        };

        function loginUser(username, password) {
            var loginBody = {
                'username': username,
                'password': password
            };
            return $http.post(permittedUserUri, loginBody)
                        .then(function (response) {
                            return response;
                        }).catch(function (error) {
                            console.log('Encountered POST error with loginUser: ');
                            console.log(error);
                        });
        }

        function createUser(username, password) {
            var createBody = {
                'username': username,
                'password': password
            };
            return $http.post(userUri, createBody)
                        .then(function (response) {
                            return response;
                        }).catch(function (error) {
                            //TODO: Appropriate error handling
                            console.log('Encountered POST error with createUser: ');
                            console.log(error);
                        });
        }

        function logoutUser(userId) {
            var config = {
                headers: {
                    'rs-user-token': $localStorage.token
                }
            };
            return $http.delete(permittedUserUri + '/' + userId, config)
                        .then(function (response) {
                            return response;
                        }).catch(function (error) {
                            console.log('Encountered DELETE error with logoutUser: ');
                            console.log(error);
                        });
        }

    }

})();
