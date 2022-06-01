module.exports = (input) => {
	Object.keys(input).forEach((key) => {
		if (!input[key]) {
			delete input[key];
		}
	});

	return input;
};
