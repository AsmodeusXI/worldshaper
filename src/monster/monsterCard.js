(function () {
    'use strict';

    angular
        .module('worldshaper.monster')
        .directive('monsterCard', monsterCardDirective);

    function monsterCardDirective() {
        var directive = {
            templateUrl: 'monster/monsterCard.directive.html',
            restrict: 'EA',
            scope: {
                monster: '=',
                deleteMonster: '=',
                prepareEdit: '='
            }
        };

        return directive;
    }

})();
