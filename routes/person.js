const express = require('express');
const router = express.Router();
const fsPromises = require('fs/promises');
const { Person } = require('../model/person.js');

router.get("/", ( req, res ) =>{
    fsPromises.readFile( "./db/person.json" )
        .then( (result)=>{
            resultJson = JSON.parse( result );
            res.send( resultJson );
        } )
        .catch( (err)=>{
            res.send( err );
        } );
} );

// get : baseUrl/person/search?q=query => [name, address]
router.get("/search", ( req, res ) =>{
    fsPromises.readFile( "./db/person.json" )
        .then( (result)=>{
            resultJson = JSON.parse( result );
            var pattern = "";
            if( req.query.q )
                pattern = req.query.q.toLowerCase().split("").map((x)=>{
                    return `(?=.*${x})`
                }).join("");

            var regex = new RegExp(`${pattern}`, "g")
            var filtered = resultJson.filter( e => 
                e.name.toLowerCase().match(regex) ||
                e.address.toLowerCase().match(regex) ||
                e.age.toString().toLowerCase().match(regex)
            );
            res.send( filtered );
        } )
        .catch( (err)=>{
            res.send( err );
        } );
} );

router.get("/:id", ( req, res ) =>{

    let personId = Number(req.params.id);
    if (!personId) throw new Error([
        'personId should be int'
    ]);

    fsPromises.readFile( "./db/person.json" )
        .then( (result)=>{
            resultJson = JSON.parse( result );
            var filtered = resultJson.filter( e => e.id == req.params.id  );
            if( filtered.length > 0 )
                filtered = filtered[0];
            res.send( filtered );
        } )
        .catch( (err)=>{
            res.send( err );
        } );
} );



router.post("/", async( req, res ) =>{
    var _person = new Person();
    _person.fromJSON( req.body );
    _person.prepareData();

    fsPromises.readFile( "./db/person.json" )
        .then( (result)=>{
            resultJson = JSON.parse( result );
            const _personJson = _person.toJson( )
            resultJson.push( _personJson );

            fsPromises.writeFile(  "./db/person.json", JSON.stringify( resultJson ) )
            .then( ()=>{
                res.send( _personJson );
            } )
            .catch( (err)=>{
                res.send( err );
            } );
        } )
        .catch( (err)=>{
            res.send( err );
        } );
} );

router.delete("/:id", async( req, res ) =>{
    fsPromises.readFile( "./db/person.json" )
        .then( (result)=>{
            resultJson = JSON.parse( result );
            var filtered = resultJson.filter( e => e.id != req.params.id  );
            // if different then id found
            if( filtered.length != resultJson.length ){
                fsPromises.writeFile(  "./db/person.json", JSON.stringify( filtered ) )
                .then( ()=>{
                    res.send( {"message" : "deleted"} );
                } )
                .catch( (err)=>{
                    res.send( err );
                } );
            }else{
                res.status(404).send( {"message" : "Not Found"} );
            }
        } )
        .catch( (err)=>{
            res.send( err );
        } );
} );

module.exports = router