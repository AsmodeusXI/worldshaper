(function () {
  'use strict';

  var worldshaperApp = angular.module(
    'worldshaper',
    [ /* dependencies */
      'worldshaper.monster',
      'worldshaper.user',
      'ui.router'
    ]
  );

  worldshaperApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('monsters', {
      url: '/monsters',
      templateUrl: 'src/monster/monster.html',
      controller: 'monsterCtrl as monsterCtrl'
    })
    .state('users', {
      url: '/',
      templateUrl: 'src/user/user.html',
      controller: 'userCtrl as userCtrl'
    });
    $urlRouterProvider.otherwise('/');
  });

})();
