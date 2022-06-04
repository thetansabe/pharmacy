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

	return { ...acc, [`${error.path}-message`]: message };
};

const handleValidationError = (err, res) => {
	return err.reduce(getErrors, {});
};

const handleUniqueConstraintError = (err, res) => {
	return err.errors.reduce(getErrors, {});
};

module.exports = (err, req, res, next) => {
	console.log(err);
	if (
		!['SequelizeValidationError', 'SequelizeUniqueConstraintError'].includes(
			err.name
		)
	) {
		err.statusCode = err.statusCode || 500;
	}

	if (err.statusCode === 401) {
		res.status(401).redirect('http://localhost:3000/login');
	} else if (err.statusCode === 403) {
		res.status(404).render('access-denied');
	} else if (err.statusCode === 404) {
		res.status(403).render('not-found');
	} else if (err.statusCode === 500) {
		res.send(err);
		// res.status(500).render('something-went-wrong');
	} else {
		let messages;

		if (err.name === 'SequelizeValidationError') {
			messages = handleValidationError(err.errors, res);
		} else if (err.name === 'SequelizeUniqueConstraintError') {
			messages = handleUniqueConstraintError(err, res);
		} else if (err.statusCode === 400) {
			messages = err.message;
			// res.status(400).json(err.message);
		}
		console.log({ ...req.body, ...messages });
		res.status(400).render(req.body.view, { ...req.body, ...messages });
	}
};
