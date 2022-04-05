const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs')
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = express.Router();
const session = require('express-session');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000)

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized : true
}));

//routes setup
var restful = require('./routes/main.js');
var manager = require('./routes/manager.js');
var store = require('./routes/store.js');
var content = require('./routes/content.js');
var statistics = require('./routes/statistics.js')

app.use('/statistics', statistics)
app.use('/store', store);
app.use('/manager', manager);
app.use('/', restful);
app.use('/content', content);

app.listen(app.get('port'), () =>{
	console.log('3000 Port : 서버 실행 중')
});
