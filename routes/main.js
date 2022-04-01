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

  axios.post('http://3.36.211.38:4000/payment/pay/pay',
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


//로그인 페이지
app.get('/login', function (req, res) {
  console.log(req.session)
  res.render('login');
  // res.redirect('/manager/index')
});

//로그인 결과
app.post('/login_result', function(req, res){
  axios.post('http://52.79.193.214:3000/user/auth',
    {
      username : req.body.username,
      password : req.body.password
    }
  )
  .then(function (error, response, body) {
    console.log(response)
    console.log(body)

    if(error){
      res.send("<script>alert('로그인에 실패했습니다.'); window.location.replace('http://15.165.153.54:3000/login');</script>")
    }
    res.send("<script>alert('로그인에 성공했습니다.'); window.location.replace('http://15.165.153.54:3000/manager/');</script>")
  })
  .catch(function (error) {
    console.log(error);

  });
})


//회원가입 페이지
app.get('/join', function (req, res) {
  res.render('join');
});


//회원가입 결과
app.post('/join_result', function(req,res){
  axios.post('http://52.79.193.214:3000/user/create',
    {
      username : req.body.username,
      email : req.body.email,
      password : req.body.password
    }
  )
  .then(function (error, response) {
    if(error){
      res.send("<script>alert('회원가입에 실패했습니다.'); window.location.replace('http://15.165.153.54:3000/join');</script>")
    }

      res.send("<script>alert('회원가입에 성공했습니다.'); window.location.replace('http://15.165.153.54:3000/login');</script>")

  })
  .catch(function (error) {
    console.log(error);
  });
});


app.get('/lcd', function(req,res){
axios.get('http://3.36.211.38:3000/status/car/space/possible')
.then(function (response) {
  // console.log(response)
  console.log(response.data)

  res.send(response.data.park_setting)
})
.catch(function (error) {
  console.log(error);
});
});



module.exports = app;
