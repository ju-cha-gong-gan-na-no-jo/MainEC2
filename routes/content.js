const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const axios = require("axios");
const request = require('request');
const CircularJSON = require('circular-json');
const qs = require('qs');
const session = require('express-session');
const mysql = require("mysql");


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


//입주민조회
app.get('/member_inquiry', function (req, res) {
  axios.get('http://52.79.193.214:3000/user/info/member')
  .then(function (response) {
    // console.log(response)
    console.log(response.data)
    console.log(response.data[0]['NAME'] )
    // console.log(response.data.paymentInfo[0]['TOTAL'])
    // console.log(response.data.park_setting['CAR_COUNT'])

    res.render("content/member_inquiry.ejs",
      {'response' : response}
    )

  })
  .catch(function (error) {
    console.log(error);
  });

});

//1회방문객 조회
app.get('/guest_inquiry', function(req,res){
  axios.get('http://52.79.193.214:3000/user/info/guest')
  .then(function (response) {
    // console.log(response)
    console.log(response.data)
    console.log(response.data[0]['NAME'] )
    console.log(response.data[0]['VISIT_DATE'] )
    // console.log(response.data.paymentInfo[0]['TOTAL'])
    // console.log(response.data.park_setting['CAR_COUNT'])

    res.render("content/guest_inquiry.ejs",
      {'response' : response}
    )

  })
  .catch(function (error) {
    console.log(error);
  });
})

//정기 방문객 조회
app.get('/book_inquiry', function(req,res){
  axios.get('http://52.79.193.214:3000/user/info/book')
  .then(function (response) {
    // console.log(response)
    console.log(response.data)
    console.log(response.data[0]['NAME'] )
    // console.log(response.data[0]['VISIT_DATE'] )
    // console.log(response.data.paymentInfo[0]['TOTAL'])
    // console.log(response.data.park_setting['CAR_COUNT'])

    res.render("content/book_inquiry.ejs",
      {'response' : response}
    )

  })
  .catch(function (error) {
    console.log(error);
  });
})


//상점 조회
app.get('/store_inquiry', function(req,res){
  axios.get('http://52.79.193.214:3000/user/info/store')
  .then(function (response) {
    // console.log(response)
    console.log(response.data)
    console.log(response.data[0]['NAME'] )
    // console.log(response.data[0]['VISIT_DATE'] )
    // console.log(response.data.paymentInfo[0]['TOTAL'])
    // console.log(response.data.park_setting['CAR_COUNT'])

    res.render("content/store_inquiry.ejs",
      {'response' : response}
    )

  })
  .catch(function (error) {
    console.log(error);
  });
});

//정산페이지 전체 조회
app.get('/settlement_all', function(req,res){
  axios.get('http://3.36.211.38:4000/payment/payinfo/all')

  .then(function (response) {
    // console.log(response)
    console.log(response.data)
    // console.log(response.data[0]['NAME'] )
    // console.log(response.data[0]['VISIT_DATE'] )
    // console.log(response.data.paymentInfo[0]['TOTAL'])
    // console.log(response.data.park_setting['CAR_COUNT'])

    res.render("content/settlement_all.ejs",
      {'response' : response}
    )

  })
  .catch(function (error) {
    console.log(error);
  });
});

//정산 상점 데이터 조회
app.get('/settlement_store', function(req,res){
  axios.get('http://3.36.211.38:4000/payment/payinfo/sto')

  .then(function (response) {
    // console.log(response)
    console.log(response.data)
    // console.log(response.data[0]['NAME'] )
    // console.log(response.data[0]['VISIT_DATE'] )

    // console.log(response.data.park_setting['CAR_COUNT'])
    res.render("content/settlement_store.ejs",
      {'response' : response}
    )

  })
  .catch(function (error) {
    console.log(error);
  });
});

//정산 특정 삼점 조회form
app.get('/settlement_specific_store', function (req, res) {
  res.render("content/settlement_specific_store.ejs")
});


//정산 특정상점 데이터 조회
app.post('/settlement_specific_store_re', function(req,res){
  axios.post('http://3.36.211.38:4000/payment/payinfo/sto/name',
      {
    		sto_name : req.body.sto_name
    	})

  .then(function (response) {
    // console.log(response)
    console.log(response.data)
    // console.log(response.data[0]['NAME'] )
    // console.log(response.data[0]['VISIT_DATE'] )
    // console.log(response.data.paymentInfo[0]['TOTAL'])
    // console.log(response.data.park_setting['CAR_COUNT'])

    res.render("content/settlement_specific_store_re.ejs",
      {'response' : response}
    )

  })
  .catch(function (error) {
    console.log(error);
  });
});


//정산 고객 데이터 조회
app.get('/settlement_customer', function(req,res){
  axios.get('http://3.36.211.38:4000/payment/payinfo/cus')

  .then(function (response) {
    // console.log(response)
    console.log(response.data)
    // console.log(response.data[0]['NAME'] )
    // console.log(response.data[0]['VISIT_DATE'] )
    // console.log(response.data.paymentInfo[0]['TOTAL'])
    // console.log(response.data.park_setting['CAR_COUNT'])

    res.render("content/settlement_customer.ejs",
      {'response' : response}
    )

  })
  .catch(function (error) {
    console.log(error);
  });
});

//정산 특정 차량을통한 조회form
app.get('/settlement_carnum', function (req, res) {
  res.render("content/settlement_carnum.ejs")
});


//정산 특정 차량 데이터 조회
app.post('/settlement_carnum_re', function(req,res){
  axios.post('http://3.36.211.38:4000/payment/pay/data/num',
      {
    		car_number : req.body.car_number
    	})

  .then(function (response) {
    // console.log(response)
    console.log(response.data.found_data)
    // console.log(response.data[0]['NAME'] )
    // console.log(response.data[0]['VISIT_DATE'] )
    // console.log(response.data.paymentInfo[0]['TOTAL'])
    // console.log(response.data.park_setting['CAR_COUNT'])

    res.render("content/settlement_carnum_re.ejs",
      {'response' : response}
    )

  })
  .catch(function (error) {
    console.log(error);
  });
});

//###########################################################################################################################################################################################################
//통계 유휴공간
app.get('/statistical_space', function(req,res){
  axios.get('http://15.165.153.54:3000/statistics/statistics_Idle_space')

  .then(function (response) {
    // console.log(response)
    console.log(response.data[0][0]['30-count(*)'])
    console.log(response.data[1][0]['30-count(*)'])
    console.log(response.data[2][0]['30-count(*)'])
    // console.log(response.data[0]['NAME'] )
    // console.log(response.data[0]['VISIT_DATE'] )
    // console.log(response.data.paymentInfo[0]['TOTAL'])
    // console.log(response.data.park_setting['CAR_COUNT'])

    res.render("content/statistical_space.ejs",
      {'response' : response}
    )

  })
  .catch(function (error) {
    console.log(error);
  });
});

//통계 유휴공간 그래프 표
app.get('/statistical_space_table', function(req,res){
  axios.get('http://15.165.153.54:3000/statistics/statistics_Idle_space')

  .then(function (response) {
    // console.log(response)
    console.log(response.data[0][0]['30-count(*)'])
    console.log(response.data[1][0]['30-count(*)'])
    console.log(response.data[2][0]['30-count(*)'])
    // console.log(response.data[0]['NAME'] )
    // console.log(response.data[0]['VISIT_DATE'] )
    // console.log(response.data.paymentInfo[0]['TOTAL'])
    // console.log(response.data.park_setting['CAR_COUNT'])

    res.render("content/statistical_space_table.ejs",
      {'response' : response}
    )

  })
  .catch(function (error) {
    console.log(error);
  });
});

//통계 유휴공간 표
app.get('/statistical_space_analysis', function (req, res) {
  res.render("content/statistical_space_analysis.ejs")
});


//통계 수익
app.get('/statistical_earning', function(req,res){
  axios.get('http://15.165.153.54:3000/statistics/stattistics_earning')

  .then(function (response) {
    // console.log(response)
    console.log(response.data)
    console.log(response.data[0]['대수'])
    // console.log(response.data[0]['NAME'] )
    // console.log(response.data[0]['VISIT_DATE'] )
    // console.log(response.data.paymentInfo[0]['TOTAL'])
    // console.log(response.data.park_setting['CAR_COUNT'])

    res.render("content/statistical_earning.ejs",
      {'response' : response}
    )

  })
  .catch(function (error) {
    console.log(error);
  });
});

//통계 수익 그래프 표
app.get('/statistical_earning_table', function(req,res){
  axios.get('http://15.165.153.54:3000/statistics/stattistics_earning')

  .then(function (response) {
    // console.log(response)
    console.log(response.data)
    console.log(response.data[0]['대수'])
    // console.log(response.data[0]['NAME'] )
    // console.log(response.data[0]['VISIT_DATE'] )
    // console.log(response.data.paymentInfo[0]['TOTAL'])
    // console.log(response.data.park_setting['CAR_COUNT'])

    res.render("content/statistical_earning_table.ejs",
      {'response' : response}
    )

  })
  .catch(function (error) {
    console.log(error);
  });
});

//통계 수익 표
app.get('/statistical_earning_analysis', function (req, res) {
  res.render("content/statistical_earning_analysis.ejs")
});




module.exports = app;
