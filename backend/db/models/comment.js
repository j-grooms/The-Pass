'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: DataTypes.INTEGER,
    photoId: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.User, {foreignKey: "userId"})
    Comment.belongsTo(models.Photo, {foreignKey: "photoId"})
  };
  return Comment;
};
