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
            postMonster: postMonster
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
    }

})();
