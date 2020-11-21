'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Photos", [
      {userId: 2, fileName: 'shepherdsPie.jpg', createdAt: new Date(), updatedAt: new Date()},
      {userId: 2, fileName: 'scallops.jpg', createdAt: new Date(), updatedAt: new Date()},
      {userId: 2, fileName: 'wellington.jpg', createdAt: new Date(), updatedAt: new Date()},
      {userId: 2, fileName: 'lamb.jpg', createdAt: new Date(), updatedAt: new Date()},
      {userId: 2, fileName: 'shrimp.jpg', createdAt: new Date(), updatedAt: new Date()},
      {userId: 3, fileName: 'dessert1.jpg', createdAt: new Date(), updatedAt: new Date()},
      {userId: 3, fileName: 'birdsNest.jpg', createdAt: new Date(), updatedAt: new Date()},
      {userId: 3, fileName: 'lemonCake.jpg', createdAt: new Date(), updatedAt: new Date()},
      {userId: 4, fileName: 'foiegras.jpg', createdAt: new Date(), updatedAt: new Date()},
      {userId: 4, fileName: 'octopus.jpg', createdAt: new Date(), updatedAt: new Date()},
      {userId: 4, fileName: 'lobstah.jpg', createdAt: new Date(), updatedAt: new Date()},
      {userId: 4, fileName: 'venison.jpg', createdAt: new Date(), updatedAt: new Date()},
      {userId: 4, fileName: 'tuna.jpg', createdAt: new Date(), updatedAt: new Date()},
      {userId: 5, fileName: 'caprese.jpg', createdAt: new Date(), updatedAt: new Date()},
      {userId: 5, fileName: 'salad.jpg', createdAt: new Date(), updatedAt: new Date()},
      {userId: 5, fileName: 'avoEggs.jpg', createdAt: new Date(), updatedAt: new Date()},
      {userId: 6, fileName: 'chickenDinner.jpg', createdAt: new Date(), updatedAt: new Date()},
      {userId: 6, fileName: 'meatloaf.jpg', createdAt: new Date(), updatedAt: new Date()},
      {userId: 6, fileName: 'salmon.jpg', createdAt: new Date(), updatedAt: new Date()},
      {userId: 6, fileName: 'sesameChicken.jpg', createdAt: new Date(), updatedAt: new Date()},
      {userId: 6, fileName: 'tacos.jpeg', createdAt: new Date(), updatedAt: new Date()},
    ])
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Photos', null, {});

  }
};
