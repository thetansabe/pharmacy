const mysql = require('../models/connectDatabase');
const AppError = require('../../utils/appError');

exports.getAllProduct = async () => {
	try {
		const allProducts = await mysql.query(`select * from product`);

		return allProducts[0];
	} catch (e) {
		throw new AppError(500);
	}
};

exports.getProductByCategory = async (type) => {
	try {
		const allProducts = await mysql.query(
			`select * from product where category = '${type}'`
		);

		return allProducts[0];
	} catch (e) {
		throw new AppError(500);
	}
};

exports.addProduct = async (objData) => {
	try {
		const addQuery = await mysql.query(`
            insert into product (name, image, category, company, quantity, price, description) 
            values ('${objData.name}', '${objData.image}', 
            '${objData.category}', '${objData.company}', 
            ${objData.quantity}, ${objData.price}, '${objData.description}')`);

		return true;
	} catch (e) {
		throw new AppError(500);
	}
};

exports.updateProduct = async (id, objData) => {
	try {
		if (objData.name) {
			await mysql.query(
				`update product set name = '${objData.name}' where product_id = ${id}`
			);
		}
		if (objData.image) {
			await mysql.query(
				`update product set image= '${objData.image}' where product_id = ${id}`
			);
		}
		if (objData.category) {
			await mysql.query(
				`update product set category = '${objData.category}' where product_id = ${id}`
			);
		}
		if (objData.company) {
			await mysql.query(
				`update product set company = '${objData.company}' where product_id = ${id}`
			);
		}
		if (objData.quantity) {
			await mysql.query(
				`update product set quantity= ${objData.quantity} where product_id = ${id}`
			);
		}
		if (objData.price) {
			await mysql.query(
				`update product set price = ${objData.price} where product_id = ${id}`
			);
		}
		if (objData.description) {
			await mysql.query(
				`update product set description = '${objData.description}' where product_id = ${id}`
			);
		}
	} catch (e) {
		throw new AppError(500);
	}
};

exports.removeProduct = async (id) => {
	try {
		await mysql.query(`delete from product where product_id = ${id}`);
		return true;
	} catch (e) {
		throw new AppError(500);
	}
};
