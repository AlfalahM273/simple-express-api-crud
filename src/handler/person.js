const fsPromises = require('fs').promises;
const { Person } = require('../model/person');
const {
    NotFoundError,
    ValidationError
} = require('../helper/error');

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
    if (!personId) throw new ValidationError('personId not set');
    personId = Number(personId);
    if (!personId) throw new ValidationError('personId must bee number!');

    return fsPromises.readFile( DB_PATH )
        .then( (result)=>{
            resultJson = JSON.parse( result );
            let filtered = resultJson.filter( e => e.id == personId  );
            if( filtered.length > 0 )
                return filtered[0];
            else 
                throw new NotFoundError('Person Not Found');
        } )
        .catch( (err)=>{
            throw err
        } );
}

const createPerson = async (data) => {
    let { name, age, address } = data
    if( !( name && address && age ) )
        throw new ValidationError('All field Required');

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
            throw err
        } );
}

const deletePerson = async (personId) => {
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
                    throw err;
                } );
            }else{
                throw new NotFoundError('Person Not Found');
            }
        } )
        .catch( (err)=>{
            throw err;
        } );
}

module.exports = {
    getAll,
    searchByQuery,
    findById,
    createPerson,
    deletePerson
};
