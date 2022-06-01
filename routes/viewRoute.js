const express = require('express');

const {
	signUp,
	login,
	homePage,
	changePassword,
} = require('../src/controllers/viewController');

const router = express.Router();

router.get('/register', signUp);
router.get('/login', login);
router.get('/change-password', changePassword);
router.get('/', homePage);

module.exports = router;
