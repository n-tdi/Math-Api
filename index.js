const express = require('express')
const app = express()
const {evaluate} = require('mathjs');
const cors = require('cors');
const bodyParser = require('body-parser');


app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/eval', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const { eval } = req.body;

    if (!eval) {
        res.status(400).send({
            message: 'expression is required'
        });
    }

    res.send({ 
        result: `${evaluate(eval)}`
    })
    
});

app.listen('3000', function(){
    console.log('Server listening on port 3000');
});

