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
  console.log(res.session.user_id)
  res.render('redirect', {
  is_logined : req.session.is_logined,
  num : req.session.num,
  type : req.session.type,
  user_id : req.session.user_id
  }
  );
});

app.get('/top', function (req, res){
  res.render('top')
});

app.get('/store_top', function (req, res){
  res.render('store_top')
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

  axios.post('http://3.38.19.220:3000/payment/pay/pay',
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
      user_id : req.body.user_id,
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
      console.log(response.data)
      console.log(response.data[0]['ACCOUNT_NUM'])
      console.log(response.data[0]['ACCOUNT_TYPE'])
      console.log(response.data[0]['USER_ID'])
      req.session.num = response.data[0]['ACCOUNT_NUM'];
      req.session.type = response.data[0]['ACCOUNT_TYPE'];
      req.session.user_id = response.data[0]['USER_ID'];
      req.session.save(function(){

        if(response.data[0]['ACCOUNT_TYPE']==='관리자'){

        res.render('redirect',  {
          num : req.session.num,
          type : req.session.type,
          user_id : req.session.user_id,
          is_logined : true,
          url : 'http://15.165.153.54:3000/manager/',
          message : '관리자 로그인에 성공했습니다.'
        }
      );
    }else{
      res.render('redirect',  {
              num : req.session.num,
              type : req.session.type,
              user_id : req.session.user_id,
              is_logined : true,
              url : 'http://15.165.153.54:3000/store/',
              message : req.session.user_id+'으로 로그인 했습니다.'
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
    if(err){
      console.log(err)
    }
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
      user_id : req.body.user_id,
      password : req.body.password,
      account_type : req.body.account_type
    }
  )
  .then(function (response) {
    if(response){
    res.render('redirect',  {
                  url : 'http://15.165.153.54:3000/login',
                  message : '회원가입에 성공했습니다.'
                }
              );
    }
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


//결제 결과 저장
app.post('/save_payment', function(req,res){
  axios.post('http:/3.38.19.220:3000/payment/pay/addpay',
    {
      car_number  : req.body.car_number,
      payment_amount : req.body.payment_amount
    }
  )
  .then(function (response) {
    if(response){
    res.render('redirect',  {
                  url : 'http://15.165.153.54:3000/payment_QR',
                  message : '결제를 성공했습니다.'
                }
              );
    }
  })
  .catch(function (error) {
    console.log(error);
    res.render('redirect',  {
                  url : 'http://15.165.153.54:3000/join',
                  message : '결제에 실패했습니다.'
                }
              );
  });
});




//파이로 전달하는 lcd정보값
app.get('/lcd', function(req,res){
  axios.get('http://3.38.19.220:3000/status/car/space/possible')
    .then(function (response) {
      // console.log(response)
      console.log(response.data.JUCHA_NUMBER)
      
    res.send(response.data)
  })
  
    .catch(function (error) {
      console.log(error);
    });
});

// 입차시
app.post('/python', (req, res) => {

  // const car_num = req.body.car_num;
  // const time = req.body.time;
  // const type = req.body.type;

  console.log("car_num " + req.body.car_num);
  console.log("time " + req.body.time);
  console.log("type " + req.body.member_type);
  

//회원여부확인
  console.log('회원여부 확인')
  axios.post('http://52.79.193.214:3000/user/info/',
    {
      car_num : req.body.car_num,
      
    })
      .then(function (response) {
        
  //여기에서 처리해줘야함
        if(response.data==='잘못된 입력입니다.'){
          
          //주차현황 정보저장

            axios.post('http://54.180.14.72:3000/status/car/data/add/enter',
             {
              car_number : req.body.car_num,
              enter_time : req.body.time,
              type : req.body.member_type
              })
              .then(function (response) {
                console.log(response.data)

                if(response.data['status']==='success'){
                  //결제모듈 저장
                  console.log('결제모듈 저장')
                  console.log(req.body.car_num)
                  console.log(req.body.type)
                    axios.post('http://3.38.19.220:3000/payment/payinfo/intime',
                     {
                      car_number : req.body.car_num,
                      enter_time : req.body.time,
                      type : req.body.member_type
                      })
                      .then(function (response) {
                        console.log(response.data['status'])
                        
                       })
                      .catch(function (error) {
                          console.log(error);
                      });
                     }

               })
              .catch(function (error) {
                  console.log(error);
              });
             }

            })
             .catch(function (error) {
              console.log(error);
            });


    res.send("입차 완료!");
});



// 출차시
app.post('/out', (req, res) => {

  console.log("car_num " + req.body.car_num);
  console.log("out_time " + req.body.out_time);
  console.log("type" + req.body.member_type);

//주차현황에 넣기
  axios.post('http://54.180.14.72:3000/status/car/data/modify/outtime',
  {
    car_number  : req.body.car_num,
    out_time : req.body.out_time
  }
  )
  .then(function (response) {
    console.log(response.data['status'])

    if(response.data['status']==='success'){
      console.log('입주민확인 시작')
      axios.post('http://52.79.193.214:3000/user/info/',
      {
        car_number  : req.body.car_num,
        out_time : req.body.out_time
      }
      )
      .then(function (response) {
        console.log(response.data)
        //결제모듈 데이터 저장
        console.log('결제모듈 데이터 저장 시작')
        if(response.data==='잘못된 입력입니다.'){
          axios.post('http://3.38.19.220:3000/payment/payinfo/outtime',
          {
            car_number  : req.body.car_num,
            out_time : req.body.out_time,
            member_type : req.body.member_type
          }
          )
          .then(function (response) {
            console.log(response.data['status'])
            //결제 정보 띄어주기
            console.log('결제 정보 띄어주기 시작')
            // if(response.data['status']==='success'){

            //   axios.post('http://3.38.19.220:3000/payment/pay/pay',
            //   {
            //     car_number : req.body.car_num
            //   }
            // )
            // .then(function (response) {
            //   // console.log(response)
          
            //   console.log(response.data)
            //   console.log(response.data.payment[0]['CAR_NUM'])
          
            //   res.render('payment_result', {'response' : response})
          
            // })
            // .catch(function (error) {
            //   console.log(error);
            // });
            res.send("출차완료")

            // }

          })
          .catch(function (error) {
          
          });
        }



      })
      .catch(function (error) {
      
      });
    



    }
  })
  .catch(function (error) {
  
  });

  
});




module.exports = app;
