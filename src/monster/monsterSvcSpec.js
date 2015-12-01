(function() {
    'use strict';

    describe('monsterSvc', function () {

        var monsterSvc, $httpBackend;
        beforeEach(module('worldshaper.monster'));
        beforeEach(inject(function(_monsterSvc_,_$httpBackend_) {
            monsterSvc = _monsterSvc_;
            $httpBackend = _$httpBackend_;
        }));

        describe('#getMonsters', function () {

            it('should fetch a list of monsters when called', function testGetMonsters() {
                var monsters, returnStatus;
                $httpBackend.expectGET('http://localhost:8080/api/monsters').respond(200, [{name: 'Goblin', hp: 30}]);
                monsterSvc.getMonsters().then(function (response) {
                    monsters = response.data;
                    returnStatus = response.status;
                });
                $httpBackend.flush();
                expect(returnStatus).toEqual(200);
                expect(monsters.length).toEqual(1);
                expect(monsters[0].name).toEqual('Goblin');
                expect(monsters[0].hp).toEqual(30);
            });

        });

        describe('#postMonster', function () {
            it('should post a monster and return a single monster', function testPostMonster() {
                var createdMonster, returnStatus;
                var toPostMonster = {
                    name: 'Kobold',
                    hp: 16
                };
                $httpBackend.expectPOST('http://localhost:8080/api/monsters', toPostMonster).respond(200, {name: 'Kobold', hp: 16});
                monsterSvc.postMonster(toPostMonster).then(function (response) {
                    createdMonster = response.data;
                    returnStatus = response.status;
                });
                $httpBackend.flush();
                expect(returnStatus).toEqual(200);
                expect(createdMonster.name).toEqual('Kobold');
                expect(createdMonster.hp).toEqual(16);
            });
        });

    });

})();
