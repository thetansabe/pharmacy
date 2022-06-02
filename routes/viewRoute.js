const express = require('express');
const { renderCreateBlog } = require('../src/controllers/blogController');

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
// router.get('/blogs', renderCreateBlog);
router.get('/', homePage);

module.exports = router;
