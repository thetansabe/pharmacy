module.exports = async (image) => {
	const uploadPath = `./public/uploads/${image.name}`;
	await image.mv(uploadPath);

	return image.name;
};
