const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const multiparty = require('multiparty');
const helper = require('../../helper/uploadFile');

const {
	getAllProduct,
	getProductByCategory,
	addProduct,
	updateProduct,
	removeProduct,
} = require('../models/productModel');

const categoryName = {
	'baby-and-child-care': 'Baby and child care',
	'diet-and-nutrition': 'Diet and nutrition',
	'natural-supplement': 'Natural supplement',
	'personal-care': 'Personal care',
};

exports.renderAllProducts = catchAsync(async (req, res, next) => {
	const products = await getAllProduct();

	if (req.originalUrl === '/products') {
		res.render('products', { products });
	} else {
		req['products'] = products;
		next();
	}
	// console.log(req);
});

exports.renderProductByCategory = catchAsync(async (req, res, next) => {
	let category;

	if (!Object.keys(categoryName).includes(req.params.category)) {
		throw new AppError(404);
	} else {
		category = categoryName[req.params.category];
	}

	const products = await getProductByCategory(category);
	res.render('products', { products });
});

exports.addProduct = catchAsync(async (req, res, next) => {
	const form = new multiparty.Form();

	form.parse(req, async (err, fields, files) => {
		if (err) console.log('upload file', err);

		//upload image
		const imageName = await helper.uploadFile(files.image);
		//console.log('imageName', imageName)
		if (imageName) {
			const imageInDb = `/images/${imageName}`;

			const objData = {
				name: fields.name[0],
				type_of_package: fields.type_of_package[0],
				company: fields.company[0],
				quantity: parseInt(fields.quantity[0]),
				price: parseInt(fields.price[0]),
				description: fields.description[0],
				image: imageInDb,
			};

			//console.log('objData: ', objData)
			const addResponse = await addProduct(objData);
			if (addResponse)
				return res.json({ code: 0, msg: 'add new product successfully' });
			else return res.json({ code: 1, msg: 'add new product failed' });
		}
	});
});

exports.updateProduct = catchAsync(async (req, res, next) => {
	const form = new multiparty.Form();

	form.parse(req, async (err, fields, files) => {
		if (err) console.log('update product', err);

		if (!fields.product_id[0])
			return res.json({ code: 100, msg: 'Update that bai, thieu product_id' });
		//let imageInDb = ''
		let objData = {
			name: fields.name[0],
			type_of_package: fields.type_of_package[0],
			company: fields.company[0],
			quantity: parseInt(fields.quantity[0]),
			price: parseInt(fields.price[0]),
			description: fields.description[0],
			image: '',
		};

		try {
			//upload image
			const imageName = await helper.uploadFile(files.image);

			if (imageName) {
				const imageInDb = `/images/${imageName}`;
				objData = { ...objData, image: imageInDb };
			}

			//console.log(objData)
			await updateProduct(parseInt(fields.product_id[0]), objData);

			return res.json({ code: 0, msg: 'update product successfully' });
		} catch (e) {
			console.log('unexpected err', e);
		}
	});
});

exports.removeProduct = catchAsync(async (req, res, next) => {
	const id = req.body.id;
	const removeRes = removeProduct(id);
	if (removeRes) {
		return res.json({ code: 0, msg: 'remove successfully' });
	} else {
		return res.json({ code: 111, msg: 'remove failed' });
	}
});
