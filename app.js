const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
require('./config/db');

let indexRouter = require('./src/routes/index');
let profilsRouter = require('./src/routes/profils');
let dashboardRouter = require('./src/routes/dashboard');
let offreRouter = require('./src/routes/offres');

// METHODE DE PAYEMENT AIRTEL_MONEY
let payement = require('./airtel_api/payement');
let refund = require('./airtel_api/refund');
let txn_unquiry = require('./airtel_api/txn_unquiry');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/plugins/',express.static(__dirname + '/node_modules/'));
app.use(cors());

app.use('/', indexRouter);
app.use('/profils', profilsRouter);
app.use('/myAccount', dashboardRouter);
app.use('/offres', offreRouter);


app.use('/api/payement', payement);
app.use('/api/refund', refund);
app.use('/api/txn_unquiry', txn_unquiry);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
