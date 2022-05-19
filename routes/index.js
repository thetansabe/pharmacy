var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/forgot', function(req, res, next) {
  res.render('forgot');
});

router.get('/products', function(req, res, next) {
  res.render('products');
});

router.get('/shopping-cart', function(req, res, next) {
  res.render('shopping-cart');
});

module.exports = router;
