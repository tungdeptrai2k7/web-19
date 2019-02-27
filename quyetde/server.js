const express = require('express');
const server = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
server.use(express.static(__dirname + '/public'));
server.use(bodyParser.urlencoded({extended : false}));
server.use(bodyParser.json());
server.get('/', (req,res) =>{
    console.log('Request to route /');
    res.status(200).send('Hello expressjs');
});
server.get('/create-question', (rep,res)=> {
    res.status(200).sendFile(path.resolve(__dirname, './public/create-question.html'));
});
server.post('/create-question', (req,res)=>{
    fs.readFile('data.json', (err,data) => {
        if (err) {
            res.status(500).send('Internal server error');
        }
    const questions = JSON.parse(data);
    console.log(typeof questions);
    questions.push({
        id: questions.length,
        content : req.body.content,
        yes:0,
        no:0,
        createdDate: new Date().toLocaleString(),
    });
    fs.writeFile('data.json', JSON.stringify(questions), (err)=>{
        if (err) {
            res.status(500).send('Internal server error');
        }
    });
    res.status(201).end('Success');
    });
});
server.listen(3000,(err) => {
    if (err) {
        throw err;
    }
    console.log('Server listen on port 3000...');
});