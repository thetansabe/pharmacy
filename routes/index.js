var express = require('express');
var router = express.Router();

const productController = require('../controller/ProductController')

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

////Get products
router.get('/products', async function(req, res, next) {
  const allProducts = productController.getAllProduct()
  allProducts.then(products => {
    //console.log('product list object', products)
    
    res.render('products', {products});
  })
});

router.get('/products/:id', async function(req, res, next) {
  const category = req.params.id
  const productsByCategory = productController.getProductByCategory(category)

  productsByCategory.then(products => {
    //console.log('product list object', products)
    
    res.render('products', {products});
  })
});


router.get('/shopping-cart', function(req, res, next) {
  res.render('shopping-cart');
});

module.exports = router;
