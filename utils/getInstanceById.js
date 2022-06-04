const AppError = require('../utils/appError');

module.exports = async (model, id) => {
	const instance = await model.findOne({
		where: {
			id,
		},
	});

	if (!instance) {
		throw new AppError(404);
	}

	return instance;
};
