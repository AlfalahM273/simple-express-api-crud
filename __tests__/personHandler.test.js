const personHandler = require('../src/handler/person');

describe('Person Get Data', () => {
    // Positive
    test('get list contains object of persons', () => {
        return personHandler.getAll().then( result => {
            expect( Array.isArray(result) ).toBeTruthy();
            // check object of persons
            if( result.length > 0 ){
                expect( result[0].name ).toBeDefined();
                expect( result[0].address ).toBeDefined();
                expect( result[0].age ).toBeDefined();
            }
        });
    });
    // Positive
    test('search by query where query is not set', () => {
        return personHandler.searchByQuery(  ).then( result => {
            expect( Array.isArray(result) ).toBeTruthy();
            // check object of persons
            if( result.length > 0 ){
                expect( result[0].name ).toBeDefined();
                expect( result[0].address ).toBeDefined();
                expect( result[0].age ).toBeDefined();
            }
        });
    });
    // Positive
    test('search by query where query is set', () => {
        return personHandler.searchByQuery( "a" ).then( result => {
            expect( Array.isArray(result) ).toBeTruthy();
            // check object of persons
            if( result.length > 0 ){
                expect( result[0].name ).toBeDefined();
                expect( result[0].address ).toBeDefined();
                expect( result[0].age ).toBeDefined();
            }
        });
    });
    // Negative
    test('find by id where id is not set', async () => {
        await expect( personHandler.findById() ).rejects.toEqual(Error('personId not set'));
        // return personHandler.findById()
        //         .catch(e => {
        //             expect(e.message).toBe('personId not set');
        //         });
    });
    // Negative
    test('find by id where id contains string', async () => {
        await expect( personHandler.findById("1sdf") ).rejects.toEqual(Error('personId must bee number!'));
        // return personHandler.findById("1sdf")
        //         .catch(e => {
        //             expect(e.message).toMatch('personId must bee number!');
        //         });
    });
    // Positive
    test('find by id where id is set and its not found return empty object', () => {
        return personHandler.findById( "99" )
        .then( result => {
            expect( Array.isArray(result) ).toBeTruthy();
            expect( result.name ).toBeUndefined();
        } );
    });
    // Positive
    test('find by id where id is set and its found return object', () => {
        return personHandler.findById( "1" )
        .then( result => {
            expect( typeof result === 'object' ).toBeTruthy();
            expect( result.name ).toBeDefined();
            expect( result.address ).toBeDefined();
            expect( result.age ).toBeDefined();
        } );
    });
})

describe('Person Create Data', () => {
    // Positive
    test('create person return json of current data with new id', () => {
        const data =  {
            "name" : "name",
            "age" : 0,
            "address" : "address",
        };

        return personHandler.createPerson( data )
        .then( result => {
            expect( typeof result === 'object' ).toBeTruthy();
            expect( result.id ).toBeDefined();
            expect( result.name ).toBe( "name" );
            expect( result.address ).toBe( "address" );
            expect( result.age ).toBe( 0 );
        } );
    });
});

describe('Person Delete Data', () => {
    // Positive
    test.skip('Delete person data based on its Id. If found, return message delete', () => {
        const personId = 5;
        return personHandler.deletePerson( personId )
        .then( result => {
            expect( typeof result === 'object' ).toBeTruthy();
            expect( result.message ).toBe("deleted");
        } );
    });
});