const express = require("express");
const app = express();

app.get('/', function (req, res){
  res.render('store/store_main',  {
    is_logined : req.session.is_logined,
    num : req.session.num,
    type : req.session.type
  })
})

app.get('/store_calculate', function (req, res){
  res.render('store/store_calculate',  {
    is_logined : req.session.is_logined,
    num : req.session.num,
    type : req.session.type
  })
})

app.get('/store_statistics', function (req, res){
  res.render('store/store_statistics',  {
    is_logined : req.session.is_logined,
    num : req.session.num,
    type : req.session.type
  })
})

module.exports = app;
