(function() {
    'use strict';

    angular
        .module('worldshaper.monster')
        .controller('monsterCtrl', monsterCtrl);

    monsterCtrl.$inject = ['monsterSvc'];

    function monsterCtrl(monsterSvc) {

        /* jshint validthis: true */
        var vm = this;

        vm.model = {
            monsters: [],
            newMonster: {
                name: null,
                hp: null
            }
        };
        vm.initialize = initialize;
        vm.createMonster = createMonster;

        initialize();

        function initialize() {
            monsterSvc.getMonsters()
                        .then(function (response) {
                            vm.model.monsters = response.data;
                        })
                        .catch(function (response) {
                            console.log('Error?');
                        });
        }

        function createMonster() {
            monsterSvc.postMonster(vm.model.newMonster)
                        .then(function (response) {
                            vm.model.monsters.push(response.data);
                        })
                        .catch(function (response) {
                            console.log('Post error?!');
                        })
                        .finally(function () {
                            vm.model.newMonster = null;
                        });
        }
    }

})();
