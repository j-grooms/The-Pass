'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    userId: DataTypes.INTEGER,
    fileName: DataTypes.STRING
  }, {});
  Photo.associate = function(models) {
    // associations can be defined here
  };
  return Photo;
};