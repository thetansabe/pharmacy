const express = require('express');

const { protect, restrictTo } = require('../src/controllers/authController');

const {
	createBlog,
	renderAllBlog,
	getBlog,
	updateBlog,
	deleteBlog,
	renderCreateBlog,
} = require('../src/controllers/blogController');

const router = express.Router();

router.get('/', renderAllBlog);
router
	.route('/create')
	.get(protect, restrictTo('admin'), renderCreateBlog)
	.post(protect, restrictTo('admin'), createBlog);

router
	.route('/:id')
	.get(getBlog)
	.patch(protect, restrictTo('admin'), updateBlog)
	.delete(protect, restrictTo('admin'), deleteBlog);

module.exports = router;
