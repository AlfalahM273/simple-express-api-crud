const fsPromises = require('fs').promises;
const personHandler = require('../handler/person');

const index = async ( req, res ) =>{
    personHandler.getAll()
    .then( resultJson =>{
        res.status(500).send( resultJson );
    } )
    .catch( (err)=>{
        res.status(500).send( err );
    } );
}

const findById = async ( req, res ) => {
    personHandler.findById( req.params.id )
    .then( resultJson =>{
        res.send( resultJson );
    } )
    .catch( (err)=>{
        res.status(404).send( err.message );
    });
}

module.exports = {
    index,
    findById
};
