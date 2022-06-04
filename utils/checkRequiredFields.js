const AppError = require('./appError');
const normalizeInput = require('./normalizeInput');

module.exports = (input, requiredFields, view) => {
	const normalizedInput = normalizeInput(input);
	input['view'] = view;

	const messages = {};
	requiredFields.forEach((field) => {
		if (!normalizedInput[field]) {
			messages[`${field}-message`] = `${field} is required`;
		}
	});

	if (Object.keys(messages).length !== 0) {
		throw new AppError(400, messages);
	}
};
