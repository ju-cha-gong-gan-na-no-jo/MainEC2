const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const axios = require("axios");
const request = require('request');
const CircularJSON = require('circular-json');
const qs = require('qs');
const session = require('express-session');
const mysql = require("mysql");

const connection = mysql.createConnection({

});


connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... \n\n");
} else {
    console.log("Error connecting database ... \n\n");
}
});

//유휴공간 통계
app.get("/statistics_Idle_space", function(req,res){
  connection.query(
    'select 30-count(*) from (select p.CAR_NUM, p.IN_TIME, p.OUT_TIME from PARK_STATUS p, CAR_INFO c where p.CAR_NUM=c.CAR_NUM) as r where r.IN_TIME < "2022-03-01 00:00:00" and not (r.OUT_TIME > "2022-03-01 00:00" and r.OUT_TIME < "2022-03-01 01:00");'+
    'select 30-count(*) from (select p.CAR_NUM, p.IN_TIME, p.OUT_TIME from PARK_STATUS p, CAR_INFO c where p.CAR_NUM=c.CAR_NUM) as r where r.IN_TIME < "2022-03-01 01:00:00" and not (r.OUT_TIME > "2022-03-01 01:00" and r.OUT_TIME < "2022-03-01 02:00");'+
    'select 30-count(*) from (select p.CAR_NUM, p.IN_TIME, p.OUT_TIME from PARK_STATUS p, CAR_INFO c where p.CAR_NUM=c.CAR_NUM) as r where r.IN_TIME < "2022-03-01 02:00:00" and not (r.OUT_TIME > "2022-03-01 02:00" and r.OUT_TIME < "2022-03-01 03:00");'+
    'select 30-count(*) from (select p.CAR_NUM, p.IN_TIME, p.OUT_TIME from PARK_STATUS p, CAR_INFO c where p.CAR_NUM=c.CAR_NUM) as r where r.IN_TIME < "2022-03-01 03:00:00" and not (r.OUT_TIME > "2022-03-01 03:00" and r.OUT_TIME < "2022-03-01 04:00");'+
    'select 30-count(*) from (select p.CAR_NUM, p.IN_TIME, p.OUT_TIME from PARK_STATUS p, CAR_INFO c where p.CAR_NUM=c.CAR_NUM) as r where r.IN_TIME < "2022-03-01 04:00:00" and not (r.OUT_TIME > "2022-03-01 04:00" and r.OUT_TIME < "2022-03-01 05:00");'+
    'select 30-count(*) from (select p.CAR_NUM, p.IN_TIME, p.OUT_TIME from PARK_STATUS p, CAR_INFO c where p.CAR_NUM=c.CAR_NUM) as r where r.IN_TIME < "2022-03-01 05:00:00" and not (r.OUT_TIME > "2022-03-01 05:00" and r.OUT_TIME < "2022-03-01 06:00");'+
    'select 30-count(*) from (select p.CAR_NUM, p.IN_TIME, p.OUT_TIME from PARK_STATUS p, CAR_INFO c where p.CAR_NUM=c.CAR_NUM) as r where r.IN_TIME < "2022-03-01 06:00:00" and not (r.OUT_TIME > "2022-03-01 06:00" and r.OUT_TIME < "2022-03-01 07:00");'+
    'select 30-count(*) from (select p.CAR_NUM, p.IN_TIME, p.OUT_TIME from PARK_STATUS p, CAR_INFO c where p.CAR_NUM=c.CAR_NUM) as r where r.IN_TIME < "2022-03-01 07:00:00" and not (r.OUT_TIME > "2022-03-01 07:00" and r.OUT_TIME < "2022-03-01 08:00");'+
    'select 30-count(*) from (select p.CAR_NUM, p.IN_TIME, p.OUT_TIME from PARK_STATUS p, CAR_INFO c where p.CAR_NUM=c.CAR_NUM) as r where r.IN_TIME < "2022-03-01 08:00:00" and not (r.OUT_TIME > "2022-03-01 08:00" and r.OUT_TIME < "2022-03-01 09:00");'+
    'select 30-count(*) from (select p.CAR_NUM, p.IN_TIME, p.OUT_TIME from PARK_STATUS p, CAR_INFO c where p.CAR_NUM=c.CAR_NUM) as r where r.IN_TIME < "2022-03-01 09:00:00" and not (r.OUT_TIME > "2022-03-01 09:00" and r.OUT_TIME < "2022-03-01 10:00");'+
    'select 30-count(*) from (select p.CAR_NUM, p.IN_TIME, p.OUT_TIME from PARK_STATUS p, CAR_INFO c where p.CAR_NUM=c.CAR_NUM) as r where r.IN_TIME < "2022-03-01 10:00:00" and not (r.OUT_TIME > "2022-03-01 10:00" and r.OUT_TIME < "2022-03-01 11:00");'+
    'select 30-count(*) from (select p.CAR_NUM, p.IN_TIME, p.OUT_TIME from PARK_STATUS p, CAR_INFO c where p.CAR_NUM=c.CAR_NUM) as r where r.IN_TIME < "2022-03-01 11:00:00" and not (r.OUT_TIME > "2022-03-01 11:00" and r.OUT_TIME < "2022-03-01 12:00");'+
    'select 30-count(*) from (select p.CAR_NUM, p.IN_TIME, p.OUT_TIME from PARK_STATUS p, CAR_INFO c where p.CAR_NUM=c.CAR_NUM) as r where r.IN_TIME < "2022-03-01 12:00:00" and not (r.OUT_TIME > "2022-03-01 12:00" and r.OUT_TIME < "2022-03-01 13:00");'+
    'select 30-count(*) from (select p.CAR_NUM, p.IN_TIME, p.OUT_TIME from PARK_STATUS p, CAR_INFO c where p.CAR_NUM=c.CAR_NUM) as r where r.IN_TIME < "2022-03-01 13:00:00" and not (r.OUT_TIME > "2022-03-01 13:00" and r.OUT_TIME < "2022-03-01 14:00");'+
    'select 30-count(*) from (select p.CAR_NUM, p.IN_TIME, p.OUT_TIME from PARK_STATUS p, CAR_INFO c where p.CAR_NUM=c.CAR_NUM) as r where r.IN_TIME < "2022-03-01 14:00:00" and not (r.OUT_TIME > "2022-03-01 14:00" and r.OUT_TIME < "2022-03-01 15:00");'+
    'select 30-count(*) from (select p.CAR_NUM, p.IN_TIME, p.OUT_TIME from PARK_STATUS p, CAR_INFO c where p.CAR_NUM=c.CAR_NUM) as r where r.IN_TIME < "2022-03-01 15:00:00" and not (r.OUT_TIME > "2022-03-01 15:00" and r.OUT_TIME < "2022-03-01 16:00");'+
    'select 30-count(*) from (select p.CAR_NUM, p.IN_TIME, p.OUT_TIME from PARK_STATUS p, CAR_INFO c where p.CAR_NUM=c.CAR_NUM) as r where r.IN_TIME < "2022-03-01 16:00:00" and not (r.OUT_TIME > "2022-03-01 16:00" and r.OUT_TIME < "2022-03-01 17:00");'+
    'select 30-count(*) from (select p.CAR_NUM, p.IN_TIME, p.OUT_TIME from PARK_STATUS p, CAR_INFO c where p.CAR_NUM=c.CAR_NUM) as r where r.IN_TIME < "2022-03-01 17:00:00" and not (r.OUT_TIME > "2022-03-01 17:00" and r.OUT_TIME < "2022-03-01 18:00");'+
    'select 30-count(*) from (select p.CAR_NUM, p.IN_TIME, p.OUT_TIME from PARK_STATUS p, CAR_INFO c where p.CAR_NUM=c.CAR_NUM) as r where r.IN_TIME < "2022-03-01 18:00:00" and not (r.OUT_TIME > "2022-03-01 18:00" and r.OUT_TIME < "2022-03-01 19:00");'+
    'select 30-count(*) from (select p.CAR_NUM, p.IN_TIME, p.OUT_TIME from PARK_STATUS p, CAR_INFO c where p.CAR_NUM=c.CAR_NUM) as r where r.IN_TIME < "2022-03-01 19:00:00" and not (r.OUT_TIME > "2022-03-01 19:00" and r.OUT_TIME < "2022-03-01 20:00");'+
    'select 30-count(*) from (select p.CAR_NUM, p.IN_TIME, p.OUT_TIME from PARK_STATUS p, CAR_INFO c where p.CAR_NUM=c.CAR_NUM) as r where r.IN_TIME < "2022-03-01 20:00:00" and not (r.OUT_TIME > "2022-03-01 20:00" and r.OUT_TIME < "2022-03-01 21:00");'+
    'select 30-count(*) from (select p.CAR_NUM, p.IN_TIME, p.OUT_TIME from PARK_STATUS p, CAR_INFO c where p.CAR_NUM=c.CAR_NUM) as r where r.IN_TIME < "2022-03-01 21:00:00" and not (r.OUT_TIME > "2022-03-01 21:00" and r.OUT_TIME < "2022-03-01 22:00");'+
    'select 30-count(*) from (select p.CAR_NUM, p.IN_TIME, p.OUT_TIME from PARK_STATUS p, CAR_INFO c where p.CAR_NUM=c.CAR_NUM) as r where r.IN_TIME < "2022-03-01 22:00:00" and not (r.OUT_TIME > "2022-03-01 22:00" and r.OUT_TIME < "2022-03-01 23:00");'+
    'select 30-count(*) from (select p.CAR_NUM, p.IN_TIME, p.OUT_TIME from PARK_STATUS p, CAR_INFO c where p.CAR_NUM=c.CAR_NUM) as r where r.IN_TIME < "2022-03-01 23:00:00" and not (r.OUT_TIME > "2022-03-01 23:00" and r.OUT_TIME < "2022-03-02 00:00");'
    , function(err, rows){
      // connection.end();
      if (!err){
        res.send(rows);
        // console.log(rows);
      }
      else {
        console.log(err)
      }
    })
})

//수익관리 통계
app.get("/stattistics_earning", function(req,res){
  connection.query(
    'select STORE_NAME as 유형, count(*) as 대수, sum(PARK_TIME) as 시간, sum(PAY_AMOUNT) as 돈 from DAILY_PAY_INFO group by STORE_NAME;', function(err, rows){
      // connection.end();
      if(!err){
        res.send(rows);
        // console.log(rows);
      }
      else{
        console.log(err)
      }
    }
  )
})






module.exports = app;
