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

    console.log(data.data.current_data[0]['차량번호'])
    console.log(typeof(data))
    console.log(typeof(data))

    res.render('manager/index', {'data' : data})
  });

});

// app.get('/', function(req, res){
//   fetch('http://3.36.211.38:3000/status/car/data/all')
//   .then(res => {
//     // response 처리
//     console.log(res);
//     // 응답을 JSON 형태로 파싱
//     return res.json();
//   })
//   .then(data => {
//     // json 출력
//     console.log(data)
//   })
//   .catch(err => {
//     // error 처리
//     console.log('Fetch Error', err);
//   });
//
// });

// app.get('/', function (req, res){
//   fetch('http://3.36.211.38:3000/status/car/data/all')
//     .then((data) => {
//       return data.json()
//     })
//     .then(())


// });

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
