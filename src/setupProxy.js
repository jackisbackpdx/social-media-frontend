const proxy = require('http-proxy-middleware');
const express = require('express');
const app = express();

app.use('/api', createProxyMiddleware({ target: 'https://us-central1-socialape-45fc1.cloudfunctions.net'}))

app.listen(3000)