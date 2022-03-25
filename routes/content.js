const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const axios = require("axios");
const request = require('request');
const CircularJSON = require('circular-json');
const qs = require('qs');


//실시간 남은 자리
app.get('/real_time_remaining_seats', function (req, res){
  axios.get('http://3.36.211.38:3000/status/car/space/possible')
  .then(data =>{
    console.log(data.data)
    console.log(data.data.park_usenumber)
    console.log(data.data.park_setting['now_place'])
    res.render('content/remaining_seats.ejs', {'data' : data} )
  });
});

app.get('/real_time_status', function (req, res){
  axios.get('http://3.36.211.38:3000/status/car/data/all')
  .then(data => {
    console.log(data.data.current_data)
    res.render('content/real_time_status', {'data' : data})
  });
});

module.exports = app;
