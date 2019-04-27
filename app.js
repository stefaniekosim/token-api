var express = require('express');
var app = express();
var db = require('./db');

app.get('/api', function (req, res) {
  res.status(200).send('AUTH TOKEN API.');
});


var AuthController = require('./routes/AuthController');
app.use('/api/auth', AuthController);

module.exports = app;