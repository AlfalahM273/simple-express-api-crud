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
    });
    // Negative
    test('find by id where id contains string', async () => {
        await expect( personHandler.findById("1sdf") ).rejects.toEqual(Error('personId must bee number!'));
    });
    // Positive
    test('find by id where id is set and its not found return empty object', async () => {
        await expect( personHandler.findById("99") ).rejects.toEqual(Error('Person Not Found'));
        // return personHandler.findById( "99" )
        // .then( result => {
        //     expect( Array.isArray(result) ).toBeTruthy();
        //     expect( result.name ).toBeUndefined();
        // } );
    });
    // Positive
    test('find by id where id is set and its found return object', async () => {
        return personHandler.findById( "4" )
        .then( result => {
            expect( typeof result === 'object' ).toBeTruthy();
            expect( result.name ).toBeDefined();
            expect( result.address ).toBeDefined();
            expect( result.age ).toBeDefined();
        } );
    });
})

let ID = 0
describe('Person Create Data', () => {
    // Positive
    test('create person return json of current data with new id', () => {
        const data =  {
            name : "name",
            age : 1,
            address : "address",
        };

        return personHandler.createPerson( data )
        .then( result => {
            ID = result.id;
            expect( typeof result === 'object' ).toBeTruthy();
            expect( result.id ).toBeDefined();
            expect( result.name ).toBe( "name" );
            expect( result.address ).toBe( "address" );
            expect( result.age ).toBe( 1 );
        } );
    });
});

describe('Person Delete Data',  () => {
    // Positive
    test('Delete person data based on its Id. Id not found', async () => {
        const personId = -1;
        await expect( personHandler.deletePerson(personId) ).rejects.toEqual(Error('Person Not Found'));
    });
    // Positive
    test('Delete person data based on its Id. If found, return message delete', () => {
        const personId = ID;
        return personHandler.deletePerson( personId )
        .then( result => {
            expect( typeof result === 'object' ).toBeTruthy();
            expect( result.message ).toBe("deleted");
        } );
    });
});
