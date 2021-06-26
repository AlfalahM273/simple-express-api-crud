const fsPromises = require('fs').promises;
const { Person } = require('../model/person');

const DB_PATH = "./src/db/person.json";

const getAll = async (  ) => {
    return fsPromises.readFile( DB_PATH )
        .then( (result)=>{
            resultJson = JSON.parse( result );
            return resultJson;
        });
}

const searchByQuery = async ( query = "" ) => {
    return fsPromises.readFile(DB_PATH)
    .then( (result)=>{
        resultJson = JSON.parse( result );
        var pattern = "";
        if( query )
            pattern = query.toLowerCase().split("").map((x)=>{
                return `(?=.*${x})`
            }).join("");

        var regex = new RegExp(`${pattern}`, "g")
        var filtered = resultJson.filter( e => 
            e.name.toLowerCase().match(regex) ||
            e.address.toLowerCase().match(regex) ||
            e.age.toString().toLowerCase().match(regex)
        );
        return filtered;
    } )
}

const findById = async ( personId ) =>{
    if (!personId) throw new Error('personId not set');
    personId = Number(personId);
    if (!personId) throw new Error('personId must bee number!');

    return fsPromises.readFile( DB_PATH )
        .then( (result)=>{
            resultJson = JSON.parse( result );
            let filtered = resultJson.filter( e => e.id == personId  );
            if( filtered.length > 0 )
                return filtered[0];
            else 
                throw new Error('Person Not Found');
        } )
        .catch( (err)=>{
            throw err
        } );
}

const createPerson = async (data) => {
    let person = new Person();
    person.fromJSON( data );
    person.prepareData();

    return fsPromises.readFile( DB_PATH )
        .then( (result)=>{
            resultJson = JSON.parse( result );
            const personJson = person.toJson( );
            resultJson.push( personJson );

            return fsPromises.writeFile(  DB_PATH, JSON.stringify( resultJson ) )
            .then( ()=>{
                return personJson
            } )
            .catch( (err)=>{
                return err
            } );
        } )
        .catch( (err)=>{
            return err
        } );
}

const deletePerson = (personId) => {
    return fsPromises.readFile( DB_PATH )
        .then( (result)=>{
            resultJson = JSON.parse(result);
            var filtered = resultJson.filter( e => e.id != personId  );
            // if different then id found
            if( filtered.length != resultJson.length ){
                return fsPromises.writeFile(  DB_PATH, JSON.stringify( filtered ) )
                .then( ()=>{
                    return { message : "deleted"};
                } )
                .catch( (err)=>{
                    return err;
                } );
            }else{
                return { message : "Not Found"};
            }
        } )
        .catch( (err)=>{
            return err;
        } );
}
module.exports = {
    getAll,
    searchByQuery,
    findById,
    createPerson,
    deletePerson
};
