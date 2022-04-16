const express = require("express");
const app = express();

app.get('/', function (req, res){

  console.log(req.session.user_id)
  // console.log(user_id)
  res.render('store/store_main',  {
    is_logined : req.session.is_logined,
    num : req.session.num,
    type : req.session.type,
    user_id : req.session.user_id
  })
})

app.get('/store_calculate', function (req, res){

  console.log(req.session.user_id)
  res.render('store/store_calculate',  {
    is_logined : req.session.is_logined,
    num : req.session.num,
    type : req.session.type,
    user_id : req.session.user_id
  })
})

app.get('/store_statistics', function (req, res){

  console.log(req.session.user_id)
  res.render('store/store_statistics',  {
    is_logined : req.session.is_logined,
    num : req.session.num,
    type : req.session.type,
    user_id : req.session.user_id
  })
})

module.exports = app;
