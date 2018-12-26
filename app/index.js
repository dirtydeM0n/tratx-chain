const express = require('express');
const Blockchain = require('../blockchain');

const HTTP_PORT = process.env.HTTP_PORT || 3001; // so that any custom port can also be used
const app = express(); // creates an express application with all the functionality of express framework
const bc = new Blockchain();

// request and response are the parameters of the arrow function
// '/' is the endpoint that interacts with the api of the instance created
app.get('/blocks', (req, res) => {       // returns the blocks of the current blockchain
    res.json(bc.chain); // sends the current instance of the blockchain
});

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`)); // es6 template string