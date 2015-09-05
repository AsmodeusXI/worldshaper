(function () {

    angular
        .module('worldshaper.monster')
        .factory('monsterSvc', monsterSvc);

    monsterSvc.$inject = ['$http']

    function monsterSvc($http) {
        return {
            getMonsters: getMonsters
        };

        function getMonsters() {
            return $http.get('/api/monster')
                        .then(function (response) {
                            return response;
                        })
                        .catch(function (error) {
                            console.log('Encountered error: ' + error);
                        })
        }
    }

})();
