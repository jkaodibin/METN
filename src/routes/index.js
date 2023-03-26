var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/payement_basic', function(req, res, next) {
  res.render('payement_basic');
});

module.exports = router;
