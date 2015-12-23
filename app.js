'use strict';

var express = require('express');
var compression = require('compression');
var expressValidator = require('express-validator');
var mongoose = require('mongoose');
var connectMongo = require('connect-mongo');
var path = require('path');
var passport = require('passport');
var expressSession = require('express-session');
var flash = require('connect-flash');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require('./config/config').get(process.env.NODE_ENV);
var passportConfig = require('./auth/passport-config');
var restrict = require('./auth/restrict');

var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var contact = require('./routes/contact');
var twitter = require('./routes/twitter');

passportConfig();

var MongoStore = connectMongo(expressSession);

mongoose.connect(config.mongoURI);

var app = express();
app.set('production', process.env.NODE_ENV === 'production');
// view engine setup 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(compression());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession({
    secret: 'edheiufhewiufhud',
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/auth', auth);
app.use('/users', users);
app.use('/contact', contact);
app.use('/twitter', restrict, twitter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
