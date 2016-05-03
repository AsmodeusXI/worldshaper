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
                $httpBackend.expectGET(env.monsterApi + '/monsters').respond(200, [{name: 'Goblin', hp: 30}]);
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
                $httpBackend.expectGET(env.monsterApi + '/monsters/test_id').respond(200, {name: 'Dragon Wyrmling', hp: 44, exp: 700});
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
                $httpBackend.expectPOST(env.monsterApi + '/monsters', toPostMonster).respond(200, {name: 'Kobold', hp: 16});
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

        describe('#updateMonster', function () {
            it('should update a monster fetched from the provided id', function testUpdateMonster() {
                var updatedMonster, returnStatus;
                var monsterFieldsToUpdate = {
                    name: 'New Monster Name',
                    hp: 666
                };
                $httpBackend.expectPUT(env.monsterApi + '/monsters/test_id', monsterFieldsToUpdate).respond(200, {_id: 'test_id', name: 'New Monster Name', hp: 666});
                monsterSvc.updateMonster('test_id', monsterFieldsToUpdate).then(function (response) {
                    updatedMonster = response.data;
                    returnStatus = response.status;
                });
                $httpBackend.flush();
                expect(returnStatus).toEqual(200);
                expect(updatedMonster._id).toEqual('test_id');
                expect(updatedMonster.name).toEqual('New Monster Name');
                expect(updatedMonster.hp).toEqual(666);
            });
        });

        describe('#deleteMonster', function () {
            it('should delete a monster with the provided id', function testDeleteMonster() {
                var deletedMessage, returnStatus;
                $httpBackend.expectDELETE(env.monsterApi + '/monsters/test_id').respond(200, {message: 'Deleted monster with id test_id'});
                monsterSvc.removeMonster('test_id').then(function (response) {
                    deletedMessage = response.data;
                    returnStatus = response.status;
                });
                $httpBackend.flush();
                expect(returnStatus).toEqual(200);
                expect(deletedMessage.message).toEqual('Deleted monster with id test_id');
            });
        });
    });

})();
