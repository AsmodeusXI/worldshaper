(function () {

    angular
        .module('worldshaper.monster')
        .factory('monsterSvc', monsterSvc);

    monsterSvc.$inject = ['$http'];

    var monsterUrl = 'http://localhost:8080/api/monster';
    function monsterSvc($http) {

        return {
            getMonsters: getMonsters,
            postMonster: postMonster
        };

        function getMonsters() {
            return $http.get(monsterUrl)
                        .then(function (response) {
                            return response;
                        })
                        .catch(function (error) {
                            console.log('Encountered GET error: ' + error);
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
