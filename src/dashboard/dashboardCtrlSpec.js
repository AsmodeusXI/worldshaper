(function() {

    describe('dashboardCtrl', function () {

        beforeEach(module('worldshaper.dashboard'));

        var controller, scope;
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            controller = $controller('dashboardCtrl', {
                $scope: scope
            });
        }));

        describe('initialization', function () {
            it('expects the model.display to be specifically set', function () {
                expect(controller.model.display).toEqual('A new way to hack it!');
            });
        });

    });

})();
