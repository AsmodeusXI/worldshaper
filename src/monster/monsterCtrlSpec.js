(function() {

    describe('monsterCtrl', function () {

        beforeEach(module('worldshaper.monster'));

        var controller, scope, mockMonsterSvc;
        beforeEach(inject(function ($controller, $rootScope, $q, monsterSvc) {
            scope = $rootScope.$new();
            mockMonsterSvc = monsterSvc;

            function providePromise(response) {
                return $q.when(response);
            };

            var fakeGetMonsterResponse = {
                data: [
                    {_id: 'test1', name: 'Goblin', hp: 30}
                ],
                status: 200
            };
            spyOn(mockMonsterSvc, 'getMonsters').and.callFake(function () {
                return providePromise(fakeGetMonsterResponse);
            });

            var fakePostMonsterResponse = {
                data: {
                    _id: 'test2',
                    name: 'Kobold',
                    hp: 16
                }
            };
            spyOn(mockMonsterSvc, 'postMonster').and.callFake(function () {
                return providePromise(fakePostMonsterResponse);
            });

            var fakeDeleteMonsterResponse = {
                data: {
                    message: 'Deleted monster with id test1'
                }
            };
            spyOn(mockMonsterSvc, 'removeMonster').and.callFake(function () {
                return providePromise(fakeDeleteMonsterResponse);
            });

            var fakeUpdateMonsterResponse = {
                data: {
                    _id: 'test1',
                    name: 'Hobgoblin',
                    hp: 44
                }
            };
            spyOn(mockMonsterSvc, 'updateMonster').and.callFake(function () {
                return providePromise(fakeUpdateMonsterResponse);
            });

            controller = $controller('monsterCtrl', {
                $scope: scope,
                monsterSvc: mockMonsterSvc
            });

            // $apply for GET in initialize()
            scope.$apply();
        }));

        describe('#initialize', function testInitialize() {
            it('expects the controller to be correctly initialized', function testValidInitialize() {
                expect(mockMonsterSvc.getMonsters).toHaveBeenCalled();
                expect(controller.model.monsters).toEqual([{_id: 'test1', name: 'Goblin', hp: 30}]);
            });
        });

        describe('#createMonster', function testCreateMonster() {
            it('should post a new monster from the newMonster variable then add it to the monster list', function testValidCreateMonster() {
                controller.model.newMonster = {
                    _id: 'test2',
                    name: 'Kobold',
                    hp: 12
                };
                controller.createMonster();
                scope.$apply();
                expect(mockMonsterSvc.postMonster).toHaveBeenCalled();
                expect(controller.model.monsters).toEqual([{_id: 'test1', name: 'Goblin', hp: 30}, {_id: 'test2', name: 'Kobold', hp: 16}]);
                expect(controller.model.newMonster).toBe(null);
            });
        });

        describe('#deleteMonster', function testDeleteMonster() {
            it('should call the monsterSvc.delete with a given id to delete a monster', function testValidDeleteMonster() {
                expect(controller.model.monsters).toEqual([{_id: 'test1', name: 'Goblin', hp: 30}]);
                controller.deleteMonster('test1');
                scope.$apply();
                expect(mockMonsterSvc.removeMonster).toHaveBeenCalledWith('test1');
                expect(controller.model.monsters).toEqual([]);
            });
        });

        describe('#prepareEdit', function testPrepareEdit() {
            it('should ready the editing model', function testPrepareEditResults() {
                expect(controller.model.monsters).toEqual([{_id: 'test1', name: 'Goblin', hp: 30}]);
                expect(controller.model.isEditing).toBe(false);
                controller.prepareEdit('test1');
                expect(controller.model.editMonster).toEqual({_id: 'test1', name: 'Goblin', hp: 30});
                expect(controller.model.isEditing).toBe(true);
            });
        });

        describe('#editMonster', function testEditMonster() {
            it('should call the monsterSvc.updateMonster with a given id to edit a monster', function testValidEditMonster() {
                expect(controller.model.monsters).toEqual([{_id: 'test1', name: 'Goblin', hp: 30}]);
                controller.editMonster({_id: 'test1', name: 'Hobgoblin', hp: 44});
                controller.model.isEditing = true;
                scope.$apply();
                expect(mockMonsterSvc.updateMonster).toHaveBeenCalledWith('test1', {_id: 'test1', name: 'Hobgoblin', hp: 44});
                expect(controller.model.monsters[0]).toEqual({_id: 'test1', name: 'Hobgoblin', hp: 44});
                expect(controller.model.isEditing).toBe(false);
                expect(controller.model.editMonster).toBe(null);
            });
        });

    });

})();
