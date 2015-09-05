(function() {

    describe('monsterCtrl', function () {

        beforeEach(module('worldshaper.monster'));

        var controller, scope, mockMonsterSvc;
        beforeEach(inject(function ($controller, $rootScope, $q, monsterSvc) {
            scope = $rootScope.$new();
            mockMonsterSvc = monsterSvc;

            var fakeMonsterResponse = {
                data: [
                    {name: 'Goblin', hp: 30}
                ]
            }

            spyOn(mockMonsterSvc, 'getMonsters').and.callFake(function () {
                var deferred = $q.defer();
                deferred.resolve(fakeMonsterResponse);
                return deferred.promise;
            });

            controller = $controller('monsterCtrl', {
                $scope: scope,
                monsterSvc: mockMonsterSvc
            });
        }));

        describe('initialization', function () {
            it('expects the controller to be correctly initialized', function () {
                expect(controller.model.display).toEqual('A new way to hack it!');
                scope.$apply();
                expect(mockMonsterSvc.getMonsters).toHaveBeenCalled();
                expect(controller.model.monsters).toEqual([{name: 'Goblin', hp: 30}])
            });
        });

    });

})();
