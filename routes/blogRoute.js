const express = require('express');

const { protect, restrictTo } = require('../src/controllers/authController');

const {
	createBlog,
	getAllBlog,
	getBlog,
	updateBlog,
	deleteBlog,
} = require('../src/controllers/blogController');

const router = express.Router();

router.route('/').get(getAllBlog).post(createBlog);
// .post(protect, restrictTo('admin'), createBlog);
router
	.route('/:id')
	.get(getBlog)
	.patch(protect, restrictTo('admin'), updateBlog)
	.delete(protect, restrictTo('admin'), deleteBlog);

module.exports = router;
