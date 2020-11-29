"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("Comments", [
			{
				userId: 2,
				photoId: 11,
				comment: "Finally, some good looking food!",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 2,
				photoId: 9,
				comment: "Looks like a children's playset",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 2,
				photoId: 14,
				comment: "Beautiful presentation",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 2,
				photoId: 19,
				comment: "Salmon looks a bit over",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 2,
				photoId: 20,
				comment: "Lovely picture. This belongs on a menu!",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 2,
				photoId: 7,
				comment: "This belongs in one of my restaraunts!",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 3,
				photoId: 2,
				comment: "Great sear on these!",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 3,
				photoId: 5,
				comment: "How do you come up with these?",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 3,
				photoId: 10,
				comment: "Great color! Don't know if I could eat it though...",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 4,
				photoId: 3,
				comment: "You're making me hungry...",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 4,
				photoId: 4,
				comment: "Teach me your ways!",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 4,
				photoId: 17,
				comment: "Nothing like a home cooked meal",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 5,
				photoId: 10,
				comment: "Wow! What a colorful plate!",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 5,
				photoId: 9,
				comment: "Nothing like goose liver...",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 5,
				photoId: 20,
				comment: "You made this at HOME!?!?!?",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 6,
				photoId: 11,
				comment: "Lobster is my favorite!",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 6,
				photoId: 7,
				comment: "I wish my desserts came out like this. Great job!",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Comments", null, {});
	},
};
