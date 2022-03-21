const express = require("express");
const app = express();

app.get('/', function (req, res) {
  res.send('Hello World!')
});


app.get('/payment', function (req, res) {
  res.render('payment');
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.get('/join', function (req, res) {
  res.render('join');
});


module.exports = app;
