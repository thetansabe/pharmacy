const Sequelize = require('sequelize');
const db = require('../../utils/connectDB');

module.exports = db.define(
	'Blog',
	{
		id: {
			type: Sequelize.INTEGER(3),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		image: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		title: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		description: {
			type: Sequelize.STRING(1234),
			allowNull: false,
		},
		url: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: false,
	}
);
