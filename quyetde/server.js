const express = require('express');
const server = express();
const path = require('path');
server.use(express.static(__dirname + '/public'));
server.get('/', (req,res) =>{
    console.log('Request to route /');
    res.status(200).send('Hello expressjs');
});
server.get('/create-question', (rep,res)=> {
    res.status(200).sendFile(path.resolve(__dirname, './public/create-question.html'));
});
server.listen(3000,(err) => {
    if (err) {
        throw err;
    }
    console.log('Server listen on port 3000...');
});