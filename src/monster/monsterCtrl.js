(function() {
    'use strict';

    angular
        .module('worldshaper.monster')
        .controller('monsterCtrl', monsterCtrl);

    monsterCtrl.$inject = ['monsterSvc'];

    function monsterCtrl(monsterSvc) {
        var vm = this;
        vm.model = {
            display: null,
            monsters: null
        };
        vm.initialize = initialize;

        initialize();

        function initialize() {
            vm.model.display = 'A new way to hack it!'
            monsterSvc.getMonsters()
                        .then(function (response) {
                            vm.model.monsters = response.data;
                        })
                        .catch(function (response){
                            console.log('Error?');
                        });
        }
    }

})();
