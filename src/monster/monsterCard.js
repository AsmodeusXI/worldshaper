(function () {
  'use strict';

  angular
  .module('worldshaper.monster')
  .directive('monsterCard', monsterCardDirective);

  function monsterCardDirective() {
    var directive = {
      templateUrl: 'src/monster/monsterCard.directive.html',
      restrict: 'EA',
      scope: {
        monster: '=',
        deleteMonster: '=',
        prepareEdit: '=',
        displayRelevantDpr: '='
      }
    };

    return directive;
  }

})();
