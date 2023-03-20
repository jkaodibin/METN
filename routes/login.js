var express = require('express');
var router = express.Router();
let UserModel = require('../models/User.Model');

/* GET users listing. */
router.get('/', async function(req, res, next) {

  // Raha te hanao req Amin'ny Model iray.
  // User = new UserModel({name:'JosuéRamananarivao',email:'j.ramananarivao2@webo-facto.com',password:'azeytr',stack:['PHP','NODEJS','CSS','HTML']})
  // User.save();
  datas = await UserModel.findOne({email:'j.ramananarivao2@webo-facto.com'}).exec();

  res.render('login', { title: 'Express', datas});
});

module.exports = router;