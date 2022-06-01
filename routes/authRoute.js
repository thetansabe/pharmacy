const express = require('express');

const {
	signup,
	login,
	logout,
	protect,
	changePassword,
} = require('../src/controllers/authController');

const router = express.Router();

router.post('/register', signup);
router.post('/login', login);
router.post('/logout', protect, logout);
router.post('/change-password', protect, changePassword);

module.exports = router;
