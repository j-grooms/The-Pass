"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("Tags", [
      {tagName: "dessert", photoId: 6, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "dessert", photoId: 7, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "dessert", photoId: 8, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "beef", photoId: 3, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "beef", photoId: 18, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "seafood", photoId: 21, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "breakfast", photoId: 16, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "seafood", photoId: 2, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "seafood", photoId: 5, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "seafood", photoId: 10, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "seafood", photoId: 11, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "seafood", photoId: 13, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "seafood", photoId: 19, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "chicken", photoId: 17, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "chicken", photoId: 20, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "salad", photoId: 14, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "salad", photoId: 15, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "lamb", photoId: 1, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "lamb", photoId: 4, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "entree", photoId: 1, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "entree", photoId: 3, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "entree", photoId: 4, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "entree", photoId: 9, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "entree", photoId: 10, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "entree", photoId: 11, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "entree", photoId: 12, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "entree", photoId: 13, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "entree", photoId: 14, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "entree", photoId: 15, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "entree", photoId: 17, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "entree", photoId: 18, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "entree", photoId: 19, createdAt: new Date(), updatedAt: new Date()},
      {tagName: "entree", photoId: 21, createdAt: new Date(), updatedAt: new Date()},
    ]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Tags", null, {});
	},
};
