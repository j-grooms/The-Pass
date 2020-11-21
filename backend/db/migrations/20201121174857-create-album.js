"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Albums", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				type: Sequelize.INTEGER,
				references: { model: "Users" },
				allowNull: false,
			},
			albumName: {
        type: Sequelize.STRING,
        allowNull: false,
			},
			photoId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "Photos" },
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("Albums");
	},
};
