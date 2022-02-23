// Import coin methods
import {coinFlip} from './modules/coin.mjs';
// Require Express.js
import express from 'express'
const app = express()

// Import minimist to help get command line args
import minimist from 'minimist';
const args = minimist(process.argv.slice(2))

// Set port to arg or default to 5000
const port = args.port || process.env.PORT || 5000

// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});

app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
    });

app.get('/app/flip/', (req, res) => {
     
    // Call flip module
    console.log(coinFlip())
})
// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});

