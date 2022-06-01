const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const db = require('../../utils/connectDB');

const User = db.define(
	'User',
	{
		id: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		gender: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				isIn: [['Nam', 'Nữ']],
			},
		},
		tel: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
			validate: {
				len: 10,
			},
		},
		address: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		birthday: {
			type: Sequelize.DATE,
			allowNull: false,
			validate: {
				isDate: true,
			},
		},
		username: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				len: [6, 16],
			},
		},
		role: {
			type: Sequelize.STRING,
			validate: {
				isIn: [['customer', 'admin', 'seller', 'warehouse staff']],
			},
			defaultValue: 'customer',
		},
	},
	{
		timestamps: false,
	}
);

const hashedPassword = async (password) => await bcrypt.hash(password, 12);

User.addHook('afterValidate', async (user, options) => {
	user.password = await hashedPassword(user.password);
});

User.prototype.isCorrectPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

module.exports = User;
