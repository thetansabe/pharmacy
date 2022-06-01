'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:*/
		await queryInterface.createTable('users', {
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
			},
			tel: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			address: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			birthday: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			username: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			role: {
				type: Sequelize.STRING,
				defaultValue: 'customer',
			},
		});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:*/
		await queryInterface.dropTable('users');
	},
};
