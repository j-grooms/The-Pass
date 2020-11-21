'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    albumName: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    photoId: DataTypes.INTEGER
  }, {});
  Album.associate = function(models) {
    // associations can be defined here
  };
  return Album;
};