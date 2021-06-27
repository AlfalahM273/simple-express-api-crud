const express = require("express")
const personRouter = require("./src/routes/person")
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// a middleware function with no mount path. This code is executed for every request to the router
app.use(function (req, res, next) {
    console.log('-------------------------------------');
    console.log('API Path:', req.originalUrl);
    console.log('Method:', req.method);
    console.log('Time:', Date.now());
    console.log('-------------------------------------');
    next()
});

// adding routes
app.use( "/person", personRouter );

// handling error
app.all('*', (req, res) => {
    res.status(404).send("Not Found");
});

app.use( function(err, req, res, next){
    res.status(500).send( err.message );
} );

app.listen( port, ()=>{
    console.log( "running server on port " + port );
} )