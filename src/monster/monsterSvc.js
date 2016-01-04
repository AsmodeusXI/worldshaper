(function () {

    angular
        .module('worldshaper.monster')
        .factory('monsterSvc', monsterSvc);

    monsterSvc.$inject = ['$http', 'ENV'];

    function monsterSvc($http, ENV) {

        var monsterUrl = ENV.api + '/monsters';

        return {
            getMonsters: getMonsters,
            getMonsterById: getMonsterById,
            postMonster: postMonster,
            updateMonster: updateMonster,
            removeMonster: removeMonster
        };

        function getMonsters() {
            return $http.get(monsterUrl)
                        .then(function (response) {
                            return response;
                        })
                        .catch(function (error) {
                            console.log('Encountered GET error with getMonsters: ' + error);
                        });
        }

        function getMonsterById(id) {
            return $http.get(monsterUrl + '/' + id)
                        .then(function (response) {
                            return response;
                        })
                        .catch(function (error) {
                            console.log('Encountered GET error with getMonsterById: ' + error);
                        });
        }

        function postMonster(postData) {
            return $http.post(monsterUrl, postData)
                        .then(function (response) {
                            return response;
                        })
                        .catch(function (error) {
                            console.log('Encountered POST error: ' + error);
                        });
        }

        function updateMonster(id, putData) {
            return $http.put(monsterUrl + '/' + id, putData)
                        .then(function (response) {
                            return response;
                        })
                        .catch(function (error) {
                            console.log('Encountered PUT error: ' + error);
                        });
        }

        function removeMonster(id) {
            return $http.delete(monsterUrl + '/' + id)
                        .then(function (response) {
                            return response;
                        })
                        .catch(function (error) {
                            console.log('Encountered DELETE error: ' + error);
                        });
        }
    }

})();
