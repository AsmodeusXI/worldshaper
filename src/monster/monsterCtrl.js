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
        hp: null,
        exp: null,
        ac: null,
        atk: null,
        dpr: null,
        dprStr: null,
        sdc: null,
        cr: null
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
    vm.displayRelevantDpr = displayRelevantDpr;
    var cr = require('dnd-5e-cr-calculator');
    var _ = require('lodash');

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

    function displayRelevantDpr(monster) {
      if(!monster) {
        return null;
      }
      var relevantDpr = monster.dpr;
      if(monster.dprStr) {
        relevantDpr = monster.dprStr;
      }
      return relevantDpr;
    }

    function calculateExpectedCR(monster) {
      var newCr = -1;
      if (typeof monster.dpr === 'string') {
        monster.dprStr = _.clone(monster.dpr);
        monster.dpr = null;
        newCr = cr.calculateWithDice(
          monster.hp,
          monster.ac,
          monster.dprStr,
          monster.atk,
          monster.sdc
        );
      } else {
        newCr = cr.calculate(
          monster.hp,
          monster.ac,
          monster.dpr,
          monster.atk,
          monster.sdc
        );
      }
      return newCr;
    }

    function createMonster() {
      vm.model.newMonster.cr = calculateExpectedCR(vm.model.newMonster);
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
      updateMonster.cr = calculateExpectedCR(updateMonster);
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
