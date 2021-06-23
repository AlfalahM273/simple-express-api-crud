const fsPromises = require('fs/promises');
const { Person } = require('../model/person');

const getAll = async (  ) => {
    return fsPromises.readFile( "./db/person.json" )
        .then( (result)=>{
            resultJson = JSON.parse( result );
            return resultJson;
        } )
}

const searchByQuery = async ( query = "" ) => {
    return fsPromises.readFile( "./db/person.json" )
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

    return fsPromises.readFile( "./db/person.json" )
        .then( (result)=>{
            resultJson = JSON.parse( result );
            var filtered = resultJson.filter( e => e.id == personId  );
            if( filtered.length > 0 )
                filtered = filtered[0];
            return filtered
        } )
        .catch( (err)=>{
            return err
        } );
}

const createPerson = async (data) => {
    let person = new Person();
    person.fromJSON( data );
    person.prepareData();

    return fsPromises.readFile( "./db/person.json" )
        .then( (result)=>{
            resultJson = JSON.parse( result );
            const personJson = person.toJson( );
            resultJson.push( personJson );

            return fsPromises.writeFile(  "./db/person.json", JSON.stringify( resultJson ) )
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

module.exports = {
    getAll,
    searchByQuery,
    findById,
    createPerson
};
