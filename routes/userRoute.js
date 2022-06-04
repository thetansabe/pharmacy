const express = require('express');

const { protect, restrictTo } = require('../src/controllers/authController');

const {
	getAllUsers,
	getUser,
	updateUser,
	deleteUser,
} = require('../src/controllers/userController');

const router = express.Router();

router.get('/profile', protect, getUser);
router.route('/').get(protect, restrictTo('admin'), getAllUsers);
router
	.route('/:id')
	.get(protect, restrictTo('admin'), getUser)
	.patch(protect, restrictTo('admin'), updateUser)
	.delete(protect, restrictTo('admin'), deleteUser);

module.exports = router;
