// Import coin methods
import {coinFlip, coinFlips, countFlips, flipACoin} from './modules/coin.mjs';
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
    // HTTP responses, using mozilla status codes
    res.statusCode = 202;
    res.statusMessage = 'The request has been received but not yet acted upon'
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });

    // String cleanup to get last part of path easily
    const path = req.path.substring(0, req.path.length-1)
    // Call flip module and set end with result
    res.end("{\"" + path.substring(path.lastIndexOf('/') + 1) + "\":\"" + coinFlip() + "\"}")
})

app.get('/app/flips/:number', (req, res) => {
    // HTTP responses, using mozilla status codes
    res.statusCode = 202;
    res.statusMessage = 'The request has been received but not yet acted upon'
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });

	const flips = coinFlips(req.params.number)
    const sumFlips = countFlips(flips)
    res.end("{\"raw\":[" + flips + "],\"summary\":{\"tails\":" + sumFlips.tails + "\"heads\":" + sumFlips.heads + "}")
});

app.get('/app/flip/call/:call', (req, res) => {
    // HTTP responses, using mozilla status codes
    res.statusCode = 202;
    res.statusMessage = 'The request has been received but not yet acted upon'
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
    
	const flip = flipACoin(req.params.call)
    res.end("{\"call\":\"" + flip.call + "\",\"flip\":\"" + flip.flip + "\",\"result\":\"" + flip.result + "\"}")
});

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});

