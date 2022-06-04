const express = require('express');
const router = express.Router();
const cartController = require('../src/controllers/CartController');

router.post('/getItems', cartController.getItemFromUsersCurrentCart);
router.post('/addToCart', cartController.addToCart);
router.post('/updateCart', cartController.updateCart);
router.delete('/deleteFromCart', cartController.deleteFromCart);
router.post('/renderItem', cartController.renderItem)

module.exports = router;
