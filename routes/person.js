const express = require('express');
const router = express.Router();
const fsPromises = require('fs/promises');
const personController = require('../controller/person');
const { Person } = require('../model/person');

router.get("/", ( req, res ) =>{
    personController.getAll()
    .then( resultJson =>{
        res.send( resultJson );
    } )
    .catch( (err)=>{
        res.send( err );
    } );
} );

// get : baseUrl/person/search?q=<query> => name/address/age
router.get("/search", ( req, res ) =>{
    personController.searchByQuery( req.query.q )
    .then( resultJson =>{
        res.send( resultJson );
    } )
    .catch( (err)=>{
        res.send( err );
    } );
} );

router.get("/:id", ( req, res ) => {
    personController.findById( req.params.id )
    .then( resultJson =>{
        res.send( resultJson );
    } )
    .catch( (err)=>{
        res.status(404).send( err.message );
    } );
} );

router.post("/", async( req, res ) => {
    personController.createPerson( req.body )
    .then( resultJson =>{
        res.send( resultJson );
    })
    .catch( (err)=>{
        res.status(404).send( err.message );
    });
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