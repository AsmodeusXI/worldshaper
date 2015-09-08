(function() {

    describe('monsterCtrl', function () {

        beforeEach(module('worldshaper.monster'));

        var controller, scope, mockMonsterSvc;
        beforeEach(inject(function ($controller, $rootScope, $q, monsterSvc) {
            scope = $rootScope.$new();
            mockMonsterSvc = monsterSvc;

            var fakeGetMonsterResponse = {
                data: [
                    {name: 'Goblin', hp: 30}
                ]
            }

            var fakePostMonsterResponse = {
                data: {
                    name: 'Kobold',
                    hp: 16
                }
            }

            spyOn(mockMonsterSvc, 'getMonsters').and.callFake(function () {
                var deferred = $q.defer();
                deferred.resolve(fakeGetMonsterResponse);
                return deferred.promise;
            });

            spyOn(mockMonsterSvc, 'postMonster').and.callFake(function () {
                var deferred = $q.defer();
                deferred.resolve(fakePostMonsterResponse);
                return deferred.promise;
            });

            controller = $controller('monsterCtrl', {
                $scope: scope,
                monsterSvc: mockMonsterSvc
            });
        }));

        describe('#initialize', function () {
            it('expects the controller to be correctly initialized', function () {
                scope.$apply();
                expect(mockMonsterSvc.getMonsters).toHaveBeenCalled();
                expect(controller.model.monsters).toEqual([{name: 'Goblin', hp: 30}]);
            });
        });

        describe('#createMonster', function () {
            it('should post a new monster from the newMonster variable then add it to the monster list', function () {
                controller.model.newMonster = {
                    name: 'Kobold',
                    hp: 12
                }
                controller.createMonster();
                scope.$apply();
                expect(mockMonsterSvc.postMonster).toHaveBeenCalled();
                expect(controller.model.monsters).toEqual([{name: 'Goblin', hp: 30}, {name: 'Kobold', hp: 16}]);
                expect(controller.model.newMonster).toBe(null);
            });
        });

    });

})();
