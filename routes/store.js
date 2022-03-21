const express = require("express");
const app = express();

app.get('/', function (req, res){
  res.render('store/store_main')
})

app.get('/store_calculate', function (req, res){
  res.render('store/store_calculate')
})

app.get('/store_statistics', function (req, res){
  res.render('store/store_statistics')
})

module.exports = app;
