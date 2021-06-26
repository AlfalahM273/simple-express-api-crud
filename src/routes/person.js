const express = require('express');
const router = express.Router();
const personHandler = require('../handler/person');
const personController = require('../controller/person');

router.get("/", personController.index );

// get : baseUrl/person/search?q=<query> => name/address/age
router.get("/search", ( req, res ) =>{
    personHandler.searchByQuery( req.query.q )
    .then( resultJson =>{
        res.send( resultJson );
    } )
    .catch( (err)=>{
        res.send( err );
    } );
} );

router.get("/:id", personController.findById );

router.post("/", async( req, res ) => {
    personHandler.createPerson( req.body )
    .then( resultJson =>{
        res.send(resultJson);
    })
    .catch( (err)=>{
        res.status(404).send(err.message);
    });
} );

router.delete("/:id", async( req, res ) =>{
    personHandler.deletePerson(req.params.id)
    .then( resultJson =>{
        res.send(resultJson);
    })
    .catch( (err)=>{
        res.status(404).send(err);
    });
});

module.exports = router
