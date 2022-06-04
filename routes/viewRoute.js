const express = require('express');
const { renderBlogsLimit } = require('../src/controllers/blogController');
const { renderAllProducts } = require('../src/controllers/productController');

const {
	signUp,
	login,
	homePage,
	changePassword,
	renderCart,
} = require('../src/controllers/viewController');

const router = express.Router();

router.get('/register', signUp);
router.get('/login', login);
router.get('/change-password', changePassword);
router.get('/shopping-cart', renderCart);
router.get('/', renderAllProducts, renderBlogsLimit, homePage);


module.exports = router;
