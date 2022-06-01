const catchAsync = require('../../utils/catchAsync');
const User = require('../models/userModel');

exports.getAllUsers = catchAsync(async (req, res, next) => {
	const users = await User.findAll();
	res.send(users);
});

exports.getUser = catchAsync(async (req, res, next) => {
	const user = await User.findOne({
		where: {
			id: req.params.id,
		},
	});

	if (!user) {
		res.send('not user');
	}

	res.send(user);
});
exports.updateUser = catchAsync(async (req, res, next) => {
	const user = await User.findOne({
		where: {
			id: req.params.id,
		},
	});

	if (!user) {
		res.send('not user');
	}

	user.update(req.body);

	await user.save();

	res.json(user);
});
exports.deleteUser = catchAsync(async (req, res, next) => {
	const user = await User.findOne({
		where: {
			id: req.params.id,
		},
	});

	if (!user) {
		res.send('Not found this user');
	}

	await user.destroy();
	res.json('deleted');
});
exports.updateMe = catchAsync(async (req, res, next) => {
	res.send('update me');
});
