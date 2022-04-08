const express = require('express')
const app = express()
const {evaluate, simplify} = require('mathjs');
const cors = require('cors');
const bodyParser = require('body-parser');


app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/valid', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const { eval } = req.body;
    console.log(eval);

    if (!eval) {
        res.status(400).send({
            result: 'expression is required'
        });
    } else {
        try {
            evaluate(eval);
            res.status(200).send({
                result: 'valid'
            });
        } catch (e) {
            res.status(400).send({
                result: 'Invalid Syntax: ' + e.message
            });
        }
    }
});

app.post('/api/eval', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const { eval } = req.body;
    console.log(eval);

    if (!eval) {
        res.status(400).send({
            result: 'expression is required'
        });
    } else {
        try {
            res.send({ 
                result: `${evaluate(eval)}`
            }) 
        } catch (e) {
            res.status(200).send({
                result: e.message + ' ' + e.name 
            });
        }
    }
});

app.post('/api/simp', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const { simp } = req.body;
    console.log(simp);

    if (!simp) {
        res.status(400).send({
            message: 'expression to simplify is required'
        });
    }

    res.send({ 
        result: `${simplify(simp)}`
    })
});


app.listen('3000', function(){
    console.log('Server listening on port 3000');
});

