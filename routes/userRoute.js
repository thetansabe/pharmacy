const express = require('express');

const { protect } = require('../src/controllers/authController');

const {
	getAllUsers,
	getUser,
	updateUser,
	deleteUser,
	updateMe,
} = require('../src/controllers/userController');

const router = express.Router();

// router.patch('/update-me', updateMe);
router.route('/').get(getAllUsers)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
