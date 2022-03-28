const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const axios = require("axios");
const request = require('request');
const CircularJSON = require('circular-json');
const qs = require('qs');
const session = require('express-session');

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.get('/top', function (req, res){
  res.render('top')
});

app.get('/menu', function(req, res){
  res.render('menu')
})

//결제 메인 페이지
app.get('/payment', function (req, res) {
  res.render('payment');
});

//결제 결과 페이지
app.post('/payment_result', function(req, res){

  axios.post('http://3.36.211.38:3000/payment/pay/pay',
    {
      car_number : req.body.car_number
    }
  )
  .then(function (response) {
    // console.log(response)
    console.log(response.data)
    console.log(response.data.payment)
    console.log(response.data.found_data[0]['CAR_NUM'])

    res.render('payment_result', {'response' : response})

  })
  .catch(function (error) {
    console.log(error);
  });


})

app.get('/login', function (req, res) {
  console.log(req.session)
  res.render('login');
  // res.redirect('/manager/index')
});

app.get('/join', function (req, res) {
  res.render('join');
});


module.exports = app;
