'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: DataTypes.INTEGER,
    photoId: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
  };
  return Comment;
};