"use strict";
module.exports = (sequelize, DataTypes) => {
	const Photo = sequelize.define(
		"Photo",
		{
			userId: DataTypes.INTEGER,
			fileName: DataTypes.STRING,
		},
		{}
	);
	Photo.associate = function (models) {
		Photo.belongsTo(models.User, { foreignKey: "userId" });
		Photo.hasMany(models.Comment, {
			foreignKey: "photoId",
			onDelete: "cascade",
			hooks: true,
		});
		Photo.hasMany(models.Tag, {
			foreignKey: "photoId",
			onDelete: "cascade",
			hooks: true,
		});
		Photo.hasMany(models.Comment, {
			foreignKey: "photoId",
			onDelete: "cascade",
			hooks: true,
		});
	};
	return Photo;
};
