const express = require("express");
const asyncHandler = require("express-async-handler");
const { User, Photo } = require("../../db/models");

const router = express.Router();

// Get image filenames for feed
router.get(
	"",
	asyncHandler(async (req, res) => {
		const feedPhotos = await Photo.findAll({});
		const fileData = getData(feedPhotos);
		res.send(fileData);
	})
);

router.get('/:id(\\d+)/', asyncHandler(async(req, res) => {
  const user = await User.findByPk(req.params.id);
  res.send(user)

}))

const getData = (photos) => {
	let fileData = [];
	// console.log(photos[1].dataValues.fileName)
	photos.map((photo) =>
  fileData.push({
    photoId: photo.dataValues.id,
    filename: photo.dataValues.fileName,
    userId: photo.dataValues.userId,
  })
	);
  console.log(fileData);
	return fileData;
};

module.exports = router;
