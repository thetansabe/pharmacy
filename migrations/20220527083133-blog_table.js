'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('blogs', {
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
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('blogs');
	},
};
