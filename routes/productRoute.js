const express = require('express');

const {
	renderAllProducts,
	renderProductByCategory,
	addProduct,
	updateProduct,
	removeProduct,
} = require('../src/controllers/productController');

const router = express.Router();

router.post('/add', addProduct);
router.put('/update', updateProduct);
router.delete('/remove', removeProduct);
router.get('/', renderAllProducts);
router.get('/:category', renderProductByCategory);

module.exports = router;
