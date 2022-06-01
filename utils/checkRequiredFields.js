const AppError = require('./appError');
const normalizeInput = require('./normalizeInput');

module.exports = (input, requiredFields) => {
	const normalizedInput = normalizeInput(input);
	const messages = {};

	requiredFields.forEach((field) => {
		if (!normalizedInput[field]) {
			messages[field] = `${field} is required`;
		}
	});

	if (Object.keys(messages).length !== 0) {
		throw new AppError(400, messages);
	}
};
