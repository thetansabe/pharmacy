const Sequelize = require('sequelize');
const db = require('../../utils/connectDB');

module.exports = db.define('Product', {
	product_id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	image: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	quantity: {
		type: Sequelize.INTEGER,
		validate: {
			isInt: true,
			min: 0,
			notNull: true,
		},
	},
	price: {
		type: Sequelize.INTEGER,
		validate: {
			isInt: true,
			min: 0,
			notNull: true,
		},
	},
	typeOfPackage: {
		type: Sequelize.ENUM,
		values: ['potion', 'tablet', 'box', 'pack'],
		allowNull: false,
	},
	description: {
		type: Sequelize.STRING(1234),
		allowNull: false,
	},
	company: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});
