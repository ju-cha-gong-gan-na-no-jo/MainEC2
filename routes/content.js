const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const axios = require("axios");
const request = require('request');
const CircularJSON = require('circular-json');
const qs = require('qs');
const session = require('express-session');
const mysql = require("mysql");
const { response } = require("./main");


//실시간 사용자에 빌려주는 공간(파이차트 대여공간)
app.get('/real_time_remaining_seats', function (req, res){
  axios.get('http://3.38.19.220:3000/status/car/space/possible')
  .then(data =>{
    console.log(data.data)
    
    console.log(data.data.JUCHA_NUMBER)
    res.render('content/remaining_seats.ejs', {'data' : data} )
  });
});


//실시간  공간(파이차트 전체공간)
app.get('/entire_real_time_remaining_seats', function (req, res){
  axios.get('http://54.180.14.72:3000/status/car/space/now/all')
  .then(response =>{
    console.log(response.data)
    
    console.log(response.data.park_setting['PARK_NUMBER'])
    res.render('content/entire_real_time_remaining_seats.ejs', {'response' : response} )
  });
});


//실시간 실제 남은 자리
app.get('/actual_parking_space', function (req, res){
  axios.get('http://54.180.14.72:3000/status/car/space/now/all')
  .then(data =>{
    console.log(data.data)
    console.log(data.data.park_setting['TOTAL_SPACE'])
    console.log(data.data.park_setting['현재 전체 주차 대수'])
    res.render('content/actual_parking_space.ejs', {'data' : data} )
  });
});

//실시간 주차현황 표
app.get('/real_time_status', function (req, res){
  axios.get('http://54.180.14.72:3000/status/car/data/all')
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
  axios.post('http://54.180.14.72:3000/status/car/data/id',
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
  axios.get('http://54.180.14.72:3000/status/car/space/now/all/today')
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
  axios.get('http://3.38.19.220:3000/payment/payinfo/all/sum')
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


//##############################################################
//등록페이지
//##############################################################

//##############################################################
//등록페이지 -입주민
//##############################################################

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

//특정 입주민 조회 form
app.get('/find_member', function(req,res){
  res.render("content/find_member.ejs")
})

//특정 입주민 조회 결과
app.post('/find_member_re', function(req,res){
  axios.post('http://52.79.193.214:3000/user/info/car/member',
      {
    		car_num  : req.body.car_num 
    	})

  .then(function (response) {
    // console.log(response)
    console.log(response.data)
    // console.log(response.data[0]['NAME'] )
    // console.log(response.data[0]['VISIT_DATE'] )
    // console.log(response.data.paymentInfo[0]['TOTAL'])
    // console.log(response.data.park_setting['CAR_COUNT'])

    res.render("content/find_member_re.ejs",
      {'response' : response}
    )

  })
  .catch(function (error) {
    console.log(error);
  });

})


//입주민 추가
app.post('/member_add', function(req,res){
  axios.post('http://52.79.193.214:3000/user/add/member',
    {
      
      name : req.body.name,
      dong : req.body.dong,
      ho : req.body.ho,
      phone_num : req.body.phone_num,
      member_type_num : req.body.member_type_num,
      remark : req.body.remark,
      car_num : req.body.car_num
    }
  )
  .then(function (response) {
    if(response)
    res.render('redirect',  {
                  url : 'http://15.165.153.54:3000/manager/member',
                  message : '입주민등록에 성공했습니다.'
                }
              );
  })
  .catch(function (error) {
    console.log(error);
    res.render('redirect',  {
                  url : 'http://15.165.153.54:3000/manager/member',
                  message : '입주민등록에 실패했습니다.'
                }
              );
  });
});



//입주민 수정
app.post('/member_update', function(req,res){
  axios.post('http://52.79.193.214:3000/user/update/member',
    {
      name : req.body.name,
      dong : req.body.dong,
      ho : req.body.ho,
      phone_num : req.body.phone_num,
      member_type_num : req.body.member_type_num,
      remark : req.body.remark,
      car_num : req.body.car_num
    }
  )
  .then(function (response) {
    if(response)
    res.render('redirect',  {
                  url : 'http://15.165.153.54:3000/manager/member',
                  message : '입주민수정에 성공했습니다.'
                }
              );
  })
  .catch(function (error) {
    console.log(error);
    res.render('redirect',  {
                  url : 'http://15.165.153.54:3000/manager/member',
                  message : '입주민수정에 실패했습니다.'
                }
              );
  });
});








//##############################################################
//등록페이지 -방문객
//##############################################################

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


//1회 방문객 조회 form
app.get('/find_guest', function(req,res){
  res.render("content/find_guest.ejs")
})


//1회 방문객 조회 결과
app.post('/find_guest_re', function(req,res){
  axios.post('http://52.79.193.214:3000/user/info/car/guest',
      {
    		car_num  : req.body.car_num 
    	})

  .then(function (response) {
    // console.log(response)
    console.log(response.data)
    // console.log(response.data[0]['NAME'] )
    // console.log(response.data[0]['VISIT_DATE'] )
    // console.log(response.data.paymentInfo[0]['TOTAL'])
    // console.log(response.data.park_setting['CAR_COUNT'])

    res.render("content/find_guest_re.ejs",
      {'response' : response}
    )

  })
  .catch(function (error) {
    console.log(error);
  });

})


//1회 방문객 추가
app.post('/guest_add', function(req,res){
  axios.post('http://52.79.193.214:3000/user/add/guest',
    {
      
      name : req.body.name,
      visit_date : req.body.visit_date,
      car_num : req.body.car_num,
      phone_num : req.body.phone_num,
      member_num : req.body.member_num,
      member_type_num : req.body.member_type_num,
      remark : req.body.remark
    }
  )
  .then(function (response) {
    if(response)
    res.render('redirect',  {
                  url : 'http://15.165.153.54:3000/manager/visitor',
                  message : '1회 방문객 등록에 성공했습니다.'
                }
              );
  })
  .catch(function (error) {
    console.log(error);
    res.render('redirect',  {
                  url : 'http://15.165.153.54:3000/manager/visitor',
                  message : '1회 방문객 등록에 실패했습니다.'
                }
              );
  });
});




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

//정기 방문객 조회 form
app.get('/find_book', function(req,res){
  res.render("content/find_book.ejs")
})


//정기 방문객 조회 결과
app.post('/find_book_re', function(req,res){
  axios.post('http://52.79.193.214:3000/user/info/car/book',
      {
    		car_num  : req.body.car_num 
    	})

  .then(function (response) {
    // console.log(response)
    console.log(response.data)
    // console.log(response.data[0]['NAME'] )
    // console.log(response.data[0]['VISIT_DATE'] )
    // console.log(response.data.paymentInfo[0]['TOTAL'])
    // console.log(response.data.park_setting['CAR_COUNT'])

    res.render("content/find_book_re.ejs",
      {'response' : response}
    )

  })
  .catch(function (error) {
    console.log(error);
  });

})

//정기 방문객 추가
app.post('/book_add', function(req,res){
  axios.post('http://52.79.193.214:3000/user/add/book',
    {
      
      booked_purpose : req.body.booked_purpose,
      validity : req.body.validity,
      phone_num : req.body.phone_num,
      name : req.body.name,
      company_name: req.body.company_name,
      car_num : req.body.car_num,
      member_type_num : req.body.member_type_num,
      remark : req.body.remark
    }
  )
  .then(function (response) {
    if(response)
    res.render('redirect',  {
                  url : 'http://15.165.153.54:3000/manager/visitor',
                  message : '정기 방문객 등록에 성공했습니다.'
                }
              );
  })
  .catch(function (error) {
    console.log(error);
    res.render('redirect',  {
                  url : 'http://15.165.153.54:3000/manager/visitor',
                  message : '정기 방문객 등록에 실패했습니다.'
                }
              );
  });
});



//##############################################################
//등록페이지 -상점
//##############################################################

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


//상점 조회 form
app.get('/find_store', function(req,res){
  res.render("content/find_store.ejs")
})


//상점 조회 결과
app.post('/find_store_re', function(req,res){
  axios.post('http://52.79.193.214:3000/user/info/name',
      {
    		store_name : req.body.store_name 
    	})

  .then(function (response) {
    // console.log(response)
    console.log(response.data)
    // console.log(response.data[0]['NAME'] )
    // console.log(response.data[0]['VISIT_DATE'] )
    // console.log(response.data.paymentInfo[0]['TOTAL'])
    // console.log(response.data.park_setting['CAR_COUNT'])

    res.render("content/find_store_re.ejs",
      {'response' : response}
    )

  })
  .catch(function (error) {
    console.log(error);
  });

})


//상점 추가
app.post('/store_add', function(req,res){
  axios.post('http://52.79.193.214:3000/user/add/store',
    {
      store_name : req.body.store_name,
      phone_num : req.body.phone_num,
      addr : req.body.addr,
      owner_name : req.body.owner_name,
      joined_date : req.body.joined_date,
      withdrew_date : req.body.withdrew_date,
      remark : req.body.remark,
      user_id : req.body.user_id,
      password : req.body.password,
      account_type : req.body.account_type
    }
  )
  .then(function (response) {
    if(response)
    res.render('redirect',  {
                  url : 'http://15.165.153.54:3000/manager/store',
                  message : '상점 등록에 성공했습니다.'
                }
              );
  })
  .catch(function (error) {
    console.log(error);
    res.render('redirect',  {
                  url : 'http://15.165.153.54:3000/content/store',
                  message : '상점 등록에 등록에 실패했습니다.'
                }
              );
  });
});



// ########################################################################
// 정산페이지
// ########################################################################

//정산페이지 전체 조회
app.get('/settlement_all', function(req,res){
  axios.get('http://3.38.19.220:3000/payment/payinfo/all')

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
  axios.get('http://3.38.19.220:3000/payment/payinfo/sto')

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
  axios.post('http://3.38.19.220:3000/payment/payinfo/sto/name',
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
  axios.get('http://3.38.19.220:3000/payment/payinfo/cus')

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
  axios.post('http://3.38.19.220:3000/payment/pay/data/num',
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

//###############################################################
//수익
//###############################################################
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

//###############################################################
//설정
//###############################################################

//설정 form
app.get('/setting_form', function (req, res) {

  axios.get('http://3.38.19.220:3000/setting/all/get')
  .then(function (response) {
    // console.log(response)
    console.log(response.data)
    console.log(response.data.found_data[0]['RENTAL_SPACE'] )
    console.log(response.data['return_time'] )
    // console.log(response.data.paymentInfo[0]['TOTAL'])
    // console.log(response.data.park_setting['CAR_COUNT'])

    res.render("content/setting_form.ejs",
      {'response' : response}
    )

  })
  .catch(function (error) {
    console.log(error);
  });

});




 //설정 update
app.post('/setting_update', function(req,res){
  axios.post('http://3.38.19.220:3000/setting/all/modify',
    {
      park_number : req.body.park_number,
      total_space : req.body.total_space,
      rental_space : req.body.rental_space,
      park_num : req.body.park_num,
      return_time : req.body.return_time,
      start_time : req.body.start_time,
      end_time : req.body.end_time,
      pay_fee : req.body.pay_fee,
      park_day_fee : req.body.park_day_fee
    }
  )
  .then(function (response) {
    if(response)
    res.render('redirect',  {
                  url : 'http://15.165.153.54:3000/content/setting_form',
                  message : '설정이 수정 되었습니다.'
                }
              );
  })
  .catch(function (error) {
    console.log(error);
    res.render('redirect',  {
                  url : 'http://15.165.153.54:3000/content/setting',
                  message : '설정 수정에 실패했습니다.'
                }
              );
  });
});

//###############################################################
//상점 
//###############################################################

//###############################################################
//상점 메인
//###############################################################

//실시간 주차현황 표
app.get('/customer_parking_status', function (req, res){
  axios.get('http://54.180.14.72:3000/status/car/data/all/cli')
  .then(function (response) {
    // console.log(response)
    console.log(response.data)

    // console.log(response.data.paymentInfo[0]['TOTAL'])
    // console.log(response.data.park_setting['CAR_COUNT'])

    res.render("content/customer_parking_status.ejs",
      {'response' : response}
    )

  })
  .catch(function (error) {
    console.log(error);
  });
});

//###############################################################
//상점 쿠폰등록
//###############################################################

//특정차량 정보조회
app.get('/find_car', function(req,res){
  res.render('content/find_car')
})

//상점 쿠폰등록 form
app.post('/find_car_cupon', function(req,res){
  axios.post('http://54.180.14.72:3000/status/car/data/id',
  	{
  		car_number : req.body.car_number
  	}
  )
  .then(function (response) {
  	// console.log(response)
    console.log(response.data)
    // console.log(response.data.found_data)
    console.log(response.data.found_data[0]['CAR_NUM'])

    res.render("content/find_car_cupon", {'response' : response})

  })
  .catch(function (error) {
  	console.log(error);
  });
})

  //쿠폰 등록
  app.post('/car_coupon_add', function(req,res){
    axios.post('http://3.38.19.220:3000/payment/coupon/add',
      {
        
        car_number : req.body.car_number,
        coupon : req.body.coupon,
        store_num : req.body.store_num,
        store_name : req.body.store_name
      }
    )
    .then(function (response) {
      if(response)
      res.render('redirect',  {
                    url : 'http://15.165.153.54:3000/content/real_time_status',
                    message : '쿠폰등록에 성공했습니다.'
                  }
                );
    })
    .catch(function (error) {
      console.log(error);
      res.render('redirect',  {
                    url : 'http://15.165.153.54:3000/content/real_time_status',
                    message : '쿠폰등록에 실패했습니다.'
                  }
                );
    });
  });
  

// ###############################################################
// 상점 정산페이지
// ###############################################################


//상점 오늘 하루 정산된 금액
app.get('/specific_store_pay', function(req,res){
  axios.get('http://3.38.19.220:3000/payment/payinfo/all/sto/spe/get/k')
  .then(function (response) {
  	// console.log(response)
    console.log(response.data)

    res.render("content/specific_store_pay.ejs", {'response' : response})

  })
  .catch(function (error) {
  	console.log(error);
  });
})


//상점 오늘 하루 정산 현황
app.get('/specific_store_settlement', function(req,res){
  axios.get('http://3.38.19.220:3000/payment/payinfo/sto/name/get/k')
  .then(function (response) {
  	// console.log(response)
    console.log(response.data)

    res.render("content/specific_store_settlement.ejs", {'response' : response})

  })
  .catch(function (error) {
  	console.log(error);
  });
})

// ###############################################################
// 상점 통계페이지
// ###############################################################

//통계 수익
app.get('/store_revenue_statistics', function(req,res){
  // axios.get('http://15.165.153.54:3000/statistics/store_statistics')

  // .then(function (response) {
  //   // console.log(response)
  //   console.log(response.data)
    
  //   // console.log(response.data[0]['NAME'] )
  //   // console.log(response.data[0]['VISIT_DATE'] )
  //   // console.log(response.data.paymentInfo[0]['TOTAL'])
  //   // console.log(response.data.park_setting['CAR_COUNT'])

    res.render("content/store_revenue_statistics.ejs" )
      // {'response' : response}
   

  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
});



//통계 수익 그래프 표
app.get('/store_statistical_earning_table', function (req, res) {
  res.render("content/store_statistical_earning_table.ejs")
});


//통계 수익 표
app.get('/store_statistical_earning_analysis', function (req, res) {
  res.render("content/store_statistical_earning_analysis.ejs")
});



module.exports = app;
