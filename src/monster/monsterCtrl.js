(function() {
    'use strict';

    angular
        .module('worldshaper.monster')
        .controller('monsterCtrl', monsterCtrl);


    function monsterCtrl(monsterSvc, userSvc, $localStorage, $state) {

        /* jshint validthis: true */
        var vm = this;

        vm.model = {
            monsters: [],
            newMonster: {
                name: null,
                hp: null
            },
            editMonster: null,
            isEditing: false
        };
        vm.initialize = initialize;
        vm.createMonster = createMonster;
        vm.deleteMonster = deleteMonster;
        vm.editMonster = editMonster;
        vm.prepareEdit = prepareEdit;
        vm.logoutUser = logoutUser;

        initialize();

        function initialize() {
            monsterSvc.getMonsters()
                        .then(function (response) {
                            if(Object.prototype.toString.call( response.data ) === '[object Array]') {
                                vm.model.monsters = response.data;
                            }
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

        function deleteMonster(id) {
            monsterSvc.removeMonster(id)
                        .then(function (response) {
                            _.remove(vm.model.monsters, function(monster) {
                                return monster._id === id;
                            });
                        })
                        .catch(function (response) {
                            console.log('Delete error?!');
                        });
        }

        function prepareEdit(id) {
            vm.model.isEditing = true;
            var toEditMonster = _.find(vm.model.monsters, {'_id': id});
            vm.model.editMonster = toEditMonster;
        }

        function editMonster(updateMonster) {
            monsterSvc.updateMonster(updateMonster._id, updateMonster)
                        .then(function (response) {
                            _.remove(vm.model.monsters, {'_id': updateMonster._id});
                            vm.model.monsters.push(response.data);
                        })
                        .catch(function (response) {
                            console.log('Edit error?!');
                        })
                        .finally(function() {
                            vm.model.isEditing = false;
                            vm.model.editMonster = null;
                        });
        }

        function logoutUser() {
            userSvc.logoutUser($localStorage.user._id)
                    .then(function (response) {
                        vm.model.message = response.data.message;
                        console.log(vm.model.message);
                    })
                    .catch(function (error) {
                        console.log('Error: logoutUser');
                        console.log(error);
                    })
                    .finally(function () {
                        $localStorage.token = null;
                        $state.go('users');
                    });
        }
    }

})();
