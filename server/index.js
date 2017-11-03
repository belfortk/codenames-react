const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

var wordBank = [];


app.get('/', function(req,res){
    res.status(200).send('the server running');
})


module.exports = app;