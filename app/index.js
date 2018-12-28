const express = require('express');
const bodyParser = require('body-parser'); // acts as a middleware that converts requests ands allows json to be received within post requests

const Blockchain = require('../blockchain');

const HTTP_PORT = process.env.HTTP_PORT || 3001; // so that any custom port can also be used
const app = express(); // creates an express application with all the functionality of express framework
app.use(bodyParser.json());

const bc = new Blockchain();

// request and response are the parameters of the arrow function
// '/' is the endpoint that interacts with the api of the instance created
app.get('/blocks', (req, res) => {       // returns the blocks of the current blockchain
    res.json(bc.chain); // sends the current instance of the blockchain
});
// when users make a post request, express will automatically create an object called data
// body object contains other objects and data that were send in the json post request
app.post('/mine', (req, res) => { 
const block = bc.addBlock(req.body.data); // we assume that data field is present in the mine object
console.log(`New block added: ${block.toString()}`);
// redirect is an express built-in function of the res object
res.redirect('/blocks'); // redirects to the get request of blocks endpoint
});

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`)); // es6 template string