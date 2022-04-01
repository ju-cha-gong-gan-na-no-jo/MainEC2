const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const axios = require("axios");
const request = require('request');
const CircularJSON = require('circular-json');
const qs = require('qs');
const session = require('express-session');
//api  주소





//관리자 메인
app.get('/', function (req, res){
    console.log(req.session)
    res.render('manager/index')

});


//주차현황
app.get('/parking_status', function (req, res){
  res.render('manager/parking_status')
})

//정산
app.get('/calculate', function (req, res){
  res.render('manager/calculate')
})

// 관리자/통계/유휴공간(메인)
app.get('/statistics', function (req, res){
  res.render('manager/statistics')
})


// 관리자/통계/수익관리
app.get('/profit', function (req, res){
  res.render('manager/profit')
})

// 관리자/등록/입주민
app.get('/member', function (req, res){
  res.render('manager/member')
})

// 관리자/등록/방문객
app.get('/visitor', function (req, res){
  res.render('manager/visitor')
})

// 관리자/등록/상점
app.get('/store', function (req, res){
  res.render('manager/store')
})

// 관리자/등록/상점
app.get('/setting', function (req, res){

  console.log(req.session.num)
  res.render('manager/setting')
})





module.exports = app;
