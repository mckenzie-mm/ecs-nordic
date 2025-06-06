const express = require('express');
var http = require('http');

const app = express();
const port = 4000;

const HOST_NAME = "webapi";

app.get('/webapi/seed', (req, res) => {

    const options = {
        hostname: HOST_NAME, 
        port: 5000,
        path: '/seed',
        method: 'GET'
    };

    const client = http.request(options, (message) => {
        let data = '';

        message.on('data', (chunk) => {
            data += chunk;
        });

        message.on('end', () => {
            console.log('Message:', data);
            res.send(data);
        });
    });

    client.on('error', (error) => {
        console.error('Error:', error);
        res.status(500).send(error);
    });

    client.end();
});

app.get('/webapi/products', (req, res) => {

    const options = {
        hostname: HOST_NAME, 
        port: 5000,
        path: '/products',
        method: 'GET'
    };

    const client = http.request(options, (message) => {
        let data = '';

        message.on('data', (chunk) => {
            data += chunk;
        });

        message.on('end', () => {
            console.log('Message:', data);
            res.send(data);
        });
    });

    client.on('error', (error) => {
        console.error('Error:', error);
        res.status(500).send(error);
    });

    client.end();
});


app.get('/', (req, res) => {
  res.send(`Example app listening on port ${port}`);
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



