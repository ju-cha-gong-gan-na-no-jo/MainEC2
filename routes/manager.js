const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const axios = require("axios");
const request = require('request');
const CircularJSON = require('circular-json');
const qs = require('qs');

//메인페이지
app.get('/', function (req, res){
  axios.get('http://3.36.211.38:3000/status/car/data/all')
  .then(data => {
    console.log(data.data);
    console.log(typeof(data.data.current_data))
    console.log(typeof(data))

    console.log(typeof(data))

    console.log(typeof(data))



    // JSON.stringify(data)
    res.render('manager/index', {'data' : data})
  });
  // .catch(function(error) {
  //   console.log(error);
  // });
  // .finally(function() {
  //
  // });

  // .catch(error => {
  //    console.error(error)
  //  })

});

// app.get('/', function (req, res){
//   const uls = "http://3.36.211.38:3000/status/car/data/all";
//   requset(urls, {json: true}, (err, result, body) => {
//     res.render('manager/index', {body})
//   })
// });


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
  res.render('manager/setting')
})





module.exports = app;
