"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("Tags", [
      {userId: }
    ]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Tags", null, {});
	},
};
