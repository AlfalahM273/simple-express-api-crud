const personController = require('../controller/person');

describe('Person Controller functionality test', () => {
    
    test('get list contains object of persons', () => {
        return personController.getAll().then( result => {
            expect( Array.isArray(result) ).toBeTruthy();
            // check object of persons
            if( result.length > 0 ){
                expect( result[0].name ).toBeDefined();
                expect( result[0].address ).toBeDefined();
                expect( result[0].age ).toBeDefined();
            }
        });
    });
    
    test('search by query where query is not set', () => {
        return personController.searchByQuery(  ).then( result => {
            expect( Array.isArray(result) ).toBeTruthy();
            // check object of persons
            if( result.length > 0 ){
                expect( result[0].name ).toBeDefined();
                expect( result[0].address ).toBeDefined();
                expect( result[0].age ).toBeDefined();
            }
        });
    });

    test('search by query where query is set', () => {
        return personController.searchByQuery( "a" ).then( result => {
            expect( Array.isArray(result) ).toBeTruthy();
            // check object of persons
            if( result.length > 0 ){
                expect( result[0].name ).toBeDefined();
                expect( result[0].address ).toBeDefined();
                expect( result[0].age ).toBeDefined();
            }
        });
    });

    test('find by id where id is not set', () => {
        // return expect( personController.findById() ).rejects.toThrow( Error );
        return personController.findById()
                .catch(e => {
                    expect(e.message).toMatch('personId not set');
                });

    });

    test('find by id where id contains string', () => {
        return personController.findById("1sdf")
                .catch(e => {
                    expect(e.message).toMatch('personId must bee number!');
                });
        // return expect(personController.findById("1sdf")).rejects.toThrow( Error );
    });

    test('find by id where id is set and its not found return empty object', () => {
        return personController.findById( "1" )
        .then( result => {
            expect( Array.isArray(result) ).toBeTruthy();
            expect( result.name ).toBeUndefined();
        } );
    });

    test('find by id where id is set and its found return object', () => {
        return personController.findById( "10" )
        .then( result => {
            expect( typeof result === 'object' ).toBeTruthy();
            expect( result.name ).toBeDefined();
            expect( result.address ).toBeDefined();
            expect( result.age ).toBeDefined();
        } );
    });

    test('create person return json of current data with new id', () => {
        const data =  {
            "name" : "name",
            "age" : 0,
            "address" : "address",
        }

        return personController.createPerson( data )
        .then( result => {
            expect( typeof result === 'object' ).toBeTruthy();
            expect( result.id ).toBeDefined();
            expect( result.name ).toBe( "name" );
            expect( result.address ).toBe( "address" );
            expect( result.age ).toBe( 0 );
        } );
    });
})