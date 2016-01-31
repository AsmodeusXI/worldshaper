(function () {
    'use strict';

    var worldshaperApp = angular.module(
        'worldshaper',
        [ /* dependencies */
            'worldshaper.monster',
            'ui.router'
        ]
    );

    worldshaperApp.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('monsters', {
                url: '/',
                templateUrl: 'monster/monster.html',
                controller: 'monsterCtrl as monsterCtrl'
            });
        $urlRouterProvider.otherwise('/');
    });

})();
