const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const axios = require("axios");
const request = require('request');
const CircularJSON = require('circular-json');
const qs = require('qs');
const session = require('express-session');
const  jsQR  =  require ( "jsqr" ) ;

app.get('/', function (req, res) {
  res.send('Hello World!')
});

//리다이렉트
app.get('/redirect', function (req, res) {
  console.log(res.session)
  res.render('redirect');
});

app.get('/top', function (req, res){
  res.render('top')
});

app.get('/menu', function(req, res){
  console.log(req.session)
  res.render('menu')
})

app.get('/menu_store', function(req, res){
  console.log(req.session)
  res.render('menu_store')
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
    console.log(response.data.payment[0]['CAR_NUM'])

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
  .then(function (response) {

    console.log(response.data)

    if(response.data==='Invalid ID or Password!'){

      console.log(response.data)

      res.render('redirect', {
        url : 'http://15.165.153.54:3000/login',
        message : '로그인에 실패했습니다.'
      })
    }

      console.log(response.data)
      req.session.is_logined = true;
      console.log(response.data[0]['ACCOUNT_NUM'])
      console.log(response.data[0]['ACCOUNT_TYPE'])
      req.session.num = response.data[0]['ACCOUNT_NUM'];
      req.session.type = response.data[0]['ACCOUNT_TYPE'];
      req.session.save(function(){
        if(response.data[0]['ACCOUNT_TYPE']==='관리자'){

        res.render('redirect',  {
          num : response.data[0]['ACCOUNT_NUM'],
          type : response.data[0]['ACCOUNT_TYPE'],
          is_logined : true,
          url : 'http://15.165.153.54:3000/manager/',
          message : '관리자 로그인에 성공했습니다.'
        }
      );
    }else{
      res.render('redirect',  {
              num : response.data[0]['ACCOUNT_NUM'],
              type : response.data[0]['ACCOUNT_TYPE'],
              is_logined : true,
              url : 'http://15.165.153.54:3000/store/',
              message : '로그인에 성공했습니다.'
            }
          );
    }


    });
  })
  .catch(function (error) {
    console.log(error);
    res.send("<script>alert('로그인에 실패했습니다.'); window.location.replace('http://15.165.153.54:3000/login');</script>")

  });
})


//로그아웃
app.get('/logout',function(req,res){

  req.session.destroy(function(err){
    req.session.num

    res.render('redirect', {
      url : 'http://15.165.153.54:3000/login',
      message : '로그아웃 됐습니다.'
    })
  })
});


//회원가입 페이지
app.get('/join', function (req, res) {
  res.render('join');
});


//회원가입 결과
app.post('/join_result', function(req,res){
  axios.post('http://52.79.193.214:3000/user/create',
    {
      username : req.body.username,
      password : req.body.password,
      account_type : req.body.account_type
    }
  )
  .then(function (response) {
    if(response)
    res.render('redirect',  {
                  url : 'http://15.165.153.54:3000/login',
                  message : '회원가입에 성공했습니다.'
                }
              );
  })
  .catch(function (error) {
    console.log(error);
    res.render('redirect',  {
                  url : 'http://15.165.153.54:3000/join',
                  message : '회원가입에 실패했습니다.'
                }
              );
  });
});


//QR결제
app.get('/payment_QR', function(req,res){

res.render('QR')
})

//QR결제
app.get('/payment_QR_end', function(req,res){

res.render('QR_end')
})




//파이로 전달하는 lcd정보값
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
