const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();

const options = {
  key: fs.readFileSync('./certs/server.key'),
  cert: fs.readFileSync('./certs/server.cert')
};

app.use(cors({
    origin: 'https://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use('/src', express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/endpoint', (req, res) => {
    res.json({ message: 'This is HTTPS-enabled!' });
});

https.createServer(options, app).listen(3000, () => {
    console.log('HTTPS server running on https://localhost:3000');
});