const db = require('../models/db');
db.connect();
const cartController = {
	addToCart(req, res, next) {
		const { user_id, product_id, quantity } = req.body;
		console.log('cart controller', user_id)
		const sql =
			`INSERT INTO cart (user_id, product_id, quantity) 
			VALUES(?, ?, ?) 
			ON DUPLICATE KEY 
			UPDATE quantity = quantity + 1`;
		const params = [user_id, product_id, quantity];
		db.query(sql, params, (err, result, fields) => {
			if (err) {
				return res.status(404).json({
					code: 1,
					message: err.sqlMessage,
				});
			} else if (result.affectedRows === 1) {
				return res.status(200).json({
					code: 0,
					message: 'Thêm sản phẩm vào giỏ hàng thành công',
				});
			} else {
				return res.status(404).json({
					code: 1,
					message: 'Thêm sản phẩm vào giỏ hàng thất bại',
				});
			}
		});
	},
	updateCart(req, res, next) {
		const toBeUpdated = {};
		const canBeUpdated = ['quantity'];
		const data = req.body;
		for (let i in data) {
			if (canBeUpdated.includes(i)) {
				toBeUpdated[i] = data[i];
			}
		}

		console.log('update to cart model', data, toBeUpdated);

		const params = [];
		let sql = `UPDATE CART SET `;
		for (let i in toBeUpdated) {
			sql += `${i} = ?,`;
			params.push(toBeUpdated[i]);
		}
		sql = sql.slice(0, -1);
		sql += ` WHERE product_id = ? AND user_id = ?`;

		params.push(data.product_id);
		params.push(data.user_id);

		db.query(sql, params, (err, result, fields) => {
			if (err) {
				return res.status(404).json({
					code: 1,
					message: err.sqlMessage,
				});
			} else if (result.affectedRows === 1) {
				return res.status(200).json({
					code: 0,
					message: 'Cập nhật giỏ hàng thành công',
				});
			} else {
				return res.status(500).json({
					code: 1,
					message: 'Cập nhật giỏ hàng thất bại',
				});
			}
		});
	},

	deleteFromCart(req, res, next) {
		const { user_id, product_id } = req.body;
		const sql = `DELETE FROM CART WHERE product_id = ? AND user_id = ?`;
		const params = [product_id, user_id];

		db.query(sql, params, (err, result, fields) => {
			if (err) {
				return res.status(404).json({
					code: 1,
					message: err.sqlMessage,
				});
			} else if (result.affectedRows === 1) {
				return res.status(200).json({
					code: 0,
					message: 'Xóa sản phẩm ra khỏi giỏ hàng thành công',
				});
			} else {
				return res.status(500).json({
					code: 1,
					message: 'Xóa sản phẩm ra khỏi giỏ hàng thất bại',
				});
			}
		});
	},
	getItemFromUsersCurrentCart(req, res, next) {
		const { user_id } = req.body;

		const sql = `SELECT * FROM CART WHERE user_id = ?`;
		const params = [user_id];

		db.query(sql, params, (err, result, fields) => {
			if (err) {
				return res.status(404).json({
					code: 1,
					message: err.sqlMessage,
				});
			} else {
				return res.status(200).json({
					code: 0,
					message: 'Lấy danh sách sản phẩm trong giỏ hàng thành công',
					data: result,
				});
			}
		});
	},
	renderItem(req, res, next){
		const { product_id } = req.body;

		const sql = `SELECT * FROM product WHERE product_id = ?`;
		const params = [product_id];

		db.query(sql, params, (err, result, fields) => {
			if (err) {
				return res.status(404).json({
					code: 1,
					message: err.sqlMessage,
				});
			} else {
				return res.status(200).json({
					code: 0,
					message: 'Lấy thong tin san pham theo id thanh cong',
					data: result,
				});
			}
		});
	}
};

module.exports = cartController;
