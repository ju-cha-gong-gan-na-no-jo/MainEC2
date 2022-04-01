const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const axios = require("axios");
const request = require('request');
const CircularJSON = require('circular-json');
const qs = require('qs');
const session = require('express-session');


//실시간 사용자에 빌려주는 공간
app.get('/real_time_remaining_seats', function (req, res){
  axios.get('http://3.36.211.38:3000/status/car/space/possible')
  .then(data =>{
    console.log(data.data)
    console.log(data.data.park_usenumber)
    console.log(data.data.park_setting['now_place'])
    res.render('content/remaining_seats.ejs', {'data' : data} )
  });
});

//실시간 실제 남은 자리
app.get('/actual_parking_space', function (req, res){
  axios.get('http://3.36.211.38:3000/status/car/space/now/all')
  .then(data =>{
    console.log(data.data)
    console.log(data.data.park_setting['TOTAL_SPACE'])
    console.log(data.data.park_setting['현재 전체 주차 대수'])
    res.render('content/actual_parking_space.ejs', {'data' : data} )
  });
});

//실시간 주차현황
app.get('/real_time_status', function (req, res){
  axios.get('http://3.36.211.38:3000/status/car/data/all')
  .then(data => {
    console.log(data.data.current_data)
    res.render('content/real_time_status', {'data' : data})
    // res.render('content/real_time_status')
  });
});

//특정차량 정보조회
app.get('/find_carnum', function(req,res){
  res.render('content/inquiry')
})

//특정차랑 정보조회 form
app.post('/specific_vehicle_data_inquiry', function(req,res){
  axios.post('http://3.36.211.38:3000/status/car/data/id',
  	{
  		car_number : req.body.car_number
  	}
  )
  .then(function (response) {
  	// console.log(response)
    console.log(response.data)
    // console.log(response.data.found_data)
    console.log(response.data.found_data[0]['CAR_NUM'])

    res.render("content/inquiry_find", {'response' : response})

  })
  .catch(function (error) {
  	console.log(error);
  });
})

//하루 총 출차된 차량수
app.get('/current_departure', function(req,res){
  axios.get('http://3.36.211.38:3000/status/car/space/now/all/today')
  .then(function (response) {
  	// console.log(response)
    console.log(response.data)
    console.log(response.data.park_setting)
    console.log(response.data.park_setting['CAR_COUNT'])

    res.render("content/current_departure", {'response' : response})

  })
  .catch(function (error) {
  	console.log(error);
  });
})

//현재 결제 총합
app.get('/current_payment', function(req,res){
  axios.get('http://3.36.211.38:4000/payment/payinfo/all/sum')
  .then(function (response) {
  	// console.log(response)
    console.log(response.data)
    console.log(response.data.paymentInfo[0]['TOTAL'])
    // console.log(response.data.park_setting['CAR_COUNT'])

    res.render("content/current_payment", {'response' : response})

  })
  .catch(function (error) {
  	console.log(error);
  });
})




//켈린더
app.get('/calendar', function (req, res) {
  res.render("content/calendar.ejs")
});






module.exports = app;
