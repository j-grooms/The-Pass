'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    userId: DataTypes.INTEGER,
    tagName: DataTypes.STRING,
    photoId: DataTypes.INTEGER
  }, {});
  Tag.associate = function(models) {
    Tag.belongsTo(models.User, {foreignKey: "userId"})
    Tag.belongsTo(models.Photo, {foreignKey: "photoId"})
  };
  return Tag;
};
