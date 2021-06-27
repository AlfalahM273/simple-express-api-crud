const fsPromises = require('fs').promises;
const personHandler = require('../handler/person');
const { CustomError } = require('../helper/error');

const index = async ( req, res ) =>{
    return personHandler.getAll()
    .then(resultJson =>{
        res.status(200).send( resultJson );
    })
    .catch( (err)=>{
        res.status(500).send( err );
    } );
}

const findById = async ( req, res ) => {
    return personHandler.findById(req.params.id)
    .then( resultJson =>{
        res.status(200).send( resultJson );
    })
    .catch( (err)=>{
        if( err instanceof CustomError )
            res.status(err.status).send( err.message );
        else
            res.status(500).send( err.message );
    });
}

const search = async ( req, res ) =>{
    return personHandler.searchByQuery( req.query.q )
    .then( resultJson =>{
        res.status(200).send( resultJson );
    } )
    .catch( (err)=>{
        res.status(500).send( err );
    } );
}

const create = async( req, res ) => {
    return personHandler.createPerson( req.body )
    .then( resultJson =>{
        res.status(200).send(resultJson);
    })
    .catch( (err)=>{
        if( err instanceof CustomError )
            res.status(err.status).send( err.message );
        else
            res.status(500).send( err.message );
    });
};

const remove = async( req, res ) =>{
    return personHandler.deletePerson(req.params.id)
    .then( resultJson =>{
        res.status(200).send(resultJson);
    })
    .catch( (err)=>{
        if( err instanceof CustomError )
            res.status(err.status).send( err.message );
        else
            res.status(500).send( err.message );
    });
}

module.exports = {
    index,
    search,
    findById,
    create,
    remove
};
