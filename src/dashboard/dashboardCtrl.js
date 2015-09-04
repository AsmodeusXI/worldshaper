(function() {
    'use strict';

    angular
        .module('worldshaper.dashboard')
        .controller('dashboardCtrl', dashboardCtrl);

    function dashboardCtrl() {
        var vm = this;
        vm.model = {
            display: null
        };
        vm.initialize = initialize;

        initialize();

        function initialize() {
            vm.model.display = 'A new way to hack it!'
        }
    }

})();
