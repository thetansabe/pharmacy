const AppError = require('../../utils/appError');

const getErrors = (acc, error) => {
	const field = error.path;
	let message;

	switch (error.validatorKey) {
		case 'is_null':
			message = `${field} is required`;
			break;
		case 'isIn':
			message = `Invalid ${field}`;
			break;
		case 'len':
			if (error.validatorArgs.length === 1)
				message = `${field} must have length of ${error.validatorArgs[0]}`;
			else
				message = `${field} must have length between ${error.validatorArgs[0]} and ${error.validatorArgs[1]}`;
			break;
		case 'not_unique':
			message = `${error.path} has already existed`;
	}

	return { ...acc, [error.path]: message };
};

const handleValidationError = (err, res) => {
	const errorMessages = err.reduce(getErrors, {});
	res.status(400).json(errorMessages);
};

const handleUniqueConstraintError = (err, res) => {
	const errorMessages = err.errors.reduce(getErrors, {});
	res.status(400).json(errorMessages);
};

module.exports = (err, req, res, next) => {
	console.log(err);
	if (err.name === 'SequelizeValidationError') {
		handleValidationError(err.errors, res);
	} else if (err.name === 'SequelizeUniqueConstraintError') {
		handleUniqueConstraintError(err, res);
	} else if (err.statusCode === 400) {
		res.status(400).json(err.message);
	} else if (err.statusCode === 401) {
		res.status(401).redirect('http://localhost:3000/login');
	} else if (err.statusCode === 404) {
		res.status(404).render('not-found');
	} else if (err.statusCode === 403) {
		res.status(403).render('access-denied');
	} else {
		res.status(500).render('something-went-wrong');
	}
};
