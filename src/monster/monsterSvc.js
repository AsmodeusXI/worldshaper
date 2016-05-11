(function () {
    'use strict';

    angular
        .module('worldshaper.monster')
        .factory('monsterSvc', monsterSvc);


    function monsterSvc($http, ENV, $localStorage) {

        var monsterUrl = ENV.monsterApi + '/monsters';
        var monsterConfig = {
            headers: {
                'rs-user-token': null
            }
        };

        return {
            getMonsters: getMonsters,
            getMonsterById: getMonsterById,
            postMonster: postMonster,
            updateMonster: updateMonster,
            removeMonster: removeMonster
        };

        function getMonsters() {
            monsterConfig.headers['rs-user-token'] = $localStorage.token;
            return $http.get(monsterUrl, monsterConfig)
                        .then(function (response) {
                            return response;
                        })
                        .catch(function (error) {
                            console.log('Encountered GET error with getMonsters: ' + error);
                        });
        }

        function getMonsterById(id) {
            monsterConfig.headers['rs-user-token'] = $localStorage.token;
            return $http.get(monsterUrl + '/' + id, monsterConfig)
                        .then(function (response) {
                            return response;
                        })
                        .catch(function (error) {
                            console.log('Encountered GET error with getMonsterById: ' + error);
                        });
        }

        function postMonster(postData) {
            monsterConfig.headers['rs-user-token'] = $localStorage.token;
            return $http.post(monsterUrl, postData, monsterConfig)
                        .then(function (response) {
                            return response;
                        })
                        .catch(function (error) {
                            console.log('Encountered POST error: ' + error);
                        });
        }

        function updateMonster(id, putData) {
            monsterConfig.headers['rs-user-token'] = $localStorage.token;
            return $http.put(monsterUrl + '/' + id, putData, monsterConfig)
                        .then(function (response) {
                            return response;
                        })
                        .catch(function (error) {
                            console.log('Encountered PUT error: ' + error);
                        });
        }

        function removeMonster(id) {
            monsterConfig.headers['rs-user-token'] = $localStorage.token;
            return $http.delete(monsterUrl + '/' + id, monsterConfig)
                        .then(function (response) {
                            return response;
                        })
                        .catch(function (error) {
                            console.log('Encountered DELETE error: ' + error);
                        });
        }
    }

})();
