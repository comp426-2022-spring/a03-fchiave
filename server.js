// Require Express.js
const express = require('express')
const app = express()
// Require and get args using Minimist
const args = require('minimist')(process.argv.slice(2))

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
    
// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});

