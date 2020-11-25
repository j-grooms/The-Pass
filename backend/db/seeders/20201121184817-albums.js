'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Albums", [
      {userId: 2, albumName: "British Food Classics", photoId: 1, createdAt: new Date(), updatedAt: new Date()},
      {userId: 2, albumName: "British Food Classics", photoId: 3, createdAt: new Date(), updatedAt: new Date()},
      {userId: 2, albumName: "British Food Classics", photoId: 4, createdAt: new Date(), updatedAt: new Date()},
      // {userId: 2, albumName: "TEST PLEASE REMOVE ME FROM SEEDER", photoId: 4, createdAt: new Date(), updatedAt: new Date()},
      {userId: 4, albumName: "Seafood", photoId: 11, createdAt: new Date(), updatedAt: new Date()},
      {userId: 4, albumName: "Seafood", photoId: 13, createdAt: new Date(), updatedAt: new Date()},
      {userId: 4, albumName: "Seafood", photoId: 10, createdAt: new Date(), updatedAt: new Date()},
      {userId: 6, albumName: "Family Favorites", photoId: 17, createdAt: new Date(), updatedAt: new Date()},
      {userId: 6, albumName: "Family Favorites", photoId: 18, createdAt: new Date(), updatedAt: new Date()},
      {userId: 6, albumName: "Family Favorites", photoId: 21, createdAt: new Date(), updatedAt: new Date()},
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Albums', null, {})
  }
};
