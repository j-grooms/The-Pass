'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    userId: DataTypes.INTEGER,
    albumName: DataTypes.STRING,
    photoId: DataTypes.INTEGER
  }, {});
  Album.associate = function(models) {
    Album.belongsTo(models.User, {foreignKey: "userId"})
    Album.belongsTo(models.Photo, {foreignKey: "photoId"})
  };
  return Album;
};
