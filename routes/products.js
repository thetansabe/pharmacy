var express = require('express');
var router = express.Router();

router.get('/baby_child', function(req, res, next) {
  res.render('products');
});

router.get('/diet_nutri', function(req, res, next) {
    res.render('products');
});

router.get('/supp', function(req, res, next) {
    res.render('products');
});

router.get('/personal_care', function(req, res, next) {
    res.render('products');
});

module.exports = router;
