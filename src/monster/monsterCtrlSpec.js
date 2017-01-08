(function() {

  describe('monsterCtrl', function () {

    beforeEach(angular.mock.module('worldshaper.monster'));

    var controller, scope, mockMonsterSvc;
    var fakeGetMonsterResponse, fakePostMonsterResponse,
        fakeDeleteMonsterResponse, fakeUpdateMonsterResponse;
    beforeEach(inject(function ($controller, $rootScope, $q, monsterSvc) {
      scope = $rootScope.$new();
      mockMonsterSvc = monsterSvc;

      function providePromise(response) {
        return $q.when(response);
      };

      fakeGetMonsterResponse = {
        data: [
          {_id: 'test1', name: 'Goblin', hp: 30}
        ],
        status: 200
      };
      spyOn(mockMonsterSvc, 'getMonsters').and.callFake(function () {
        return providePromise(fakeGetMonsterResponse);
      });

      fakePostMonsterResponse = {
        data: {
          _id: 'test2',
          name: 'Kobold', hp: 5, ac: 14, dpr: 30, atk: 5, sdc: 14, cr: "1"
        }
      };
      spyOn(mockMonsterSvc, 'postMonster').and.callFake(function () {
        return providePromise(fakePostMonsterResponse);
      });

      fakeDeleteMonsterResponse = {
        data: {
          message: 'Deleted monster with id test1'
        }
      };
      spyOn(mockMonsterSvc, 'removeMonster').and.callFake(function () {
        return providePromise(fakeDeleteMonsterResponse);
      });

      fakeUpdateMonsterResponse = {
        data: {
          _id: 'test1',
          name: 'Hobgoblin',
          hp: 44, ac: 14, dpr: 30, atk: 5, sdc: 14, cr: '2'
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
          hp: 5,
          ac: 14,
          dpr: 30,
          atk: 5,
          sdc: 14,
        };
        controller.createMonster();
        expect(controller.model.newMonster.cr).toEqual("1");
        scope.$apply();
        expect(mockMonsterSvc.postMonster).toHaveBeenCalled();
        expect(controller.model.monsters).toEqual([
          {_id: 'test1', name: 'Goblin', hp: 30},
          {_id: 'test2', name: 'Kobold', hp: 5, ac: 14, dpr: 30, atk: 5, sdc: 14, cr: "1"}
        ]);
        expect(controller.model.newMonster).toBe(null);
      });

      it('should calculate cr with dprStr if it is a String', function testCreateMonsterWithDprStr() {
        controller.model.newMonster = {
          _id: 'test3',
          name: 'Orc',
          hp: 5,
          ac: 14,
          dpr: '7d6+5',
          atk: 5,
          sdc: 14,
        };
        fakePostMonsterResponse.data = {
          _id: 'test3',
          name: 'Orc',
          hp: 5,
          ac: 14,
          dpr: null,
          dprStr: '7d6+5',
          atk: 5,
          sdc: 14,
          cr: '1'
        };
        controller.createMonster();
        expect(controller.model.newMonster.cr).toEqual("1");
        scope.$apply();
        expect(mockMonsterSvc.postMonster).toHaveBeenCalled();
        expect(controller.model.monsters).toEqual([
          {_id: 'test1', name: 'Goblin', hp: 30},
          {_id: 'test3', name: 'Orc', hp: 5, ac: 14, dpr: null, dprStr: '7d6+5', atk: 5, sdc: 14, cr: "1"}
        ]);
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
        controller.editMonster({_id: 'test1', name: 'Hobgoblin', hp: 44, ac: 14, dpr: 30, atk: 5, sdc: 14});
        controller.model.isEditing = true;
        scope.$apply();
        expect(mockMonsterSvc.updateMonster).toHaveBeenCalledWith('test1', {_id: 'test1', name: 'Hobgoblin', hp: 44, ac: 14, dpr: 30, atk: 5, sdc: 14, cr: '2'});
        expect(controller.model.monsters[0]).toEqual({_id: 'test1', name: 'Hobgoblin', hp: 44, ac: 14, dpr: 30, atk: 5, sdc: 14, cr: '2'});
        expect(controller.model.isEditing).toBe(false);
        expect(controller.model.editMonster).toBe(null);
      });

      it('should allow an update with a dprStr to function properly', function testValidEditMonster() {
        fakeUpdateMonsterResponse.data = {_id: 'test1', name: 'Hobgoblin', hp: 44, ac: 14, dpr: null, dprStr: '7d6+5', atk: 5, sdc: 14, cr: '2'};
        expect(controller.model.monsters).toEqual([{_id: 'test1', name: 'Goblin', hp: 30}]);
        controller.editMonster({_id: 'test1', name: 'Hobgoblin', hp: 44, ac: 14, dpr: '7d6+5', atk: 5, sdc: 14});
        controller.model.isEditing = true;
        scope.$apply();
        expect(mockMonsterSvc.updateMonster).toHaveBeenCalledWith('test1', {_id: 'test1', name: 'Hobgoblin', hp: 44, ac: 14, dpr: null, dprStr: '7d6+5', atk: 5, sdc: 14, cr: '2'});
        expect(controller.model.monsters[0]).toEqual({_id: 'test1', name: 'Hobgoblin', hp: 44, ac: 14, dpr: null, dprStr: '7d6+5', atk: 5, sdc: 14, cr: '2'});
        expect(controller.model.isEditing).toBe(false);
        expect(controller.model.editMonster).toBe(null);
      });

      it('should switch from using dprStr to using dpr when changed', function testValidEditMonster() {
        controller.model.monsters.push({_id: 'test4', name: 'Dragon', hp: 30, dprStr: '7d6+5'})
        fakeUpdateMonsterResponse.data = {_id: 'test4', name: 'Hobgoblin', hp: 44, ac: 14, dpr: 30, atk: 5, sdc: 14, cr: '2'};
        expect(controller.model.monsters).toEqual([{_id: 'test1', name: 'Goblin', hp: 30},{_id: 'test4', name: 'Dragon', hp: 30, dprStr: '7d6+5'}]);
        controller.editMonster({_id: 'test4', name: 'Hobgoblin', hp: 44, ac: 14, dpr: 30, atk: 5, sdc: 14});
        controller.model.isEditing = true;
        scope.$apply();
        expect(mockMonsterSvc.updateMonster).toHaveBeenCalledWith('test4', {_id: 'test4', name: 'Hobgoblin', hp: 44, ac: 14, dpr: 30, atk: 5, sdc: 14, cr: '2'});
        expect(controller.model.monsters[1]).toEqual({_id: 'test4', name: 'Hobgoblin', hp: 44, ac: 14, dpr: 30, atk: 5, sdc: 14, cr: '2'});
        expect(controller.model.isEditing).toBe(false);
        expect(controller.model.editMonster).toBe(null);
      });
    });

    describe('#displayRelevantDpr', function testDisplayRelevantDpr() {
      it('should display the dprStr if it is around', function testDisplayDprStr() {
        var testMonster = {
          _id: 'test5',
          name: 'Illithid',
          dpr: 0,
          dprStr: '8d10+6'
        }
        var actual = controller.displayRelevantDpr(testMonster);
        expect(actual).toEqual('8d10+6');
      });

      it('should display the dpr if dprStr is null or missing', function testDisplayDpr() {
        var testMonster = {
          _id: 'test5',
          name: 'Illithid',
          dpr: 30,
        }
        var actual = controller.displayRelevantDpr(testMonster);
        expect(actual).toEqual(30);
        testMonster.dprStr = null;
        var actual = controller.displayRelevantDpr(testMonster);
        expect(actual).toEqual(30);
      });

      it('should return null if monster is null', function testDisplayNull() {
        var actual = controller.displayRelevantDpr(null);
        expect(actual).toEqual(null);
      });
    });

  });

})();
