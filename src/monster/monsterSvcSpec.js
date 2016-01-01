(function() {
    'use strict';

    describe('monsterSvc', function () {

        var monsterSvc, $httpBackend, env;
        beforeEach(module('worldshaper.monster'));
        beforeEach(inject(function(_monsterSvc_,_$httpBackend_,_ENV_) {
            monsterSvc = _monsterSvc_;
            $httpBackend = _$httpBackend_;
            env = _ENV_;
        }));

        describe('#getMonsters', function () {
            it('should fetch a list of monsters when called', function testGetMonsters() {
                var monsters, returnStatus;
                $httpBackend.expectGET(env.api + '/monsters').respond(200, [{name: 'Goblin', hp: 30}]);
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

        describe('#getMonsterById', function () {
            it('should fetch a single monster by the provided id', function testGetMonsterById() {
                var monster, returnStatus;
                $httpBackend.expectGET(env.api + '/monsters/test_id').respond(200, {name: 'Dragon Wyrmling', hp: 44, exp: 700});
                monsterSvc.getMonsterById('test_id').then(function (response) {
                    monster = response.data;
                    returnStatus = response.status;
                });
                $httpBackend.flush();
                expect(returnStatus).toEqual(200);
                expect(monster.name).toEqual('Dragon Wyrmling');
                expect(monster.hp).toEqual(44);
                expect(monster.exp).toEqual(700);
            });
        });

        describe('#postMonster', function () {
            it('should post a monster and return a single monster', function testPostMonster() {
                var createdMonster, returnStatus;
                var toPostMonster = {
                    name: 'Kobold',
                    hp: 16
                };
                $httpBackend.expectPOST(env.api + '/monsters', toPostMonster).respond(200, {name: 'Kobold', hp: 16});
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
