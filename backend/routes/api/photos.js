const express = require("express");
const asyncHandler = require("express-async-handler");
const { User, Photo, Album } = require("../../db/models");

const router = express.Router();

// Get image filenames for feed
router.get(
	"",
	asyncHandler(async (req, res) => {
		const feedPhotos = await Photo.findAll({});
		const fileData = getPhotoData(feedPhotos);
		res.send(fileData);
	})
);

// Get all images associated with specific user
router.get(
	"/:id(\\d+)/",
	asyncHandler(async (req, res) => {
		const photos = await Photo.findAll({ where: { userId: req.params.id } });
		const data = getPhotoData(photos);
		res.send(data);
	})
);

// Get all albums associated with specific user
router.get(
	"/:id/albums",
	asyncHandler(async (req, res) => {
		const albums = await Album.findAll({ where: { userId: req.params.id } });
		// console.log(albums)
		const data = getAlbumData(albums, req.params.id);
		console.log("data", data);
		res.send(data);
	})
);

// Return a full list of albums
const getAlbumData = (albums, userId) => {
	// find all unique album names
	let albumList = new Set()
	albums.map((album) => {
		albumList.add(album.dataValues.albumName);
	});

	// iterate through each to return an array of objects
	// keep outputs uniform with other routes
	let albumData = [];
	albumList.forEach(album => (albumData.push({
		albumName: album,
		userId,
	})))

	console.log("list", albumData);
	return albumData;
};

// Send minimum amount of photo data back to front-end
const getPhotoData = (photos) => {
	let fileData = [];
	// console.log(photos[1].dataValues.fileName)
	photos.map((photo) =>
		fileData.push({
			photoId: photo.dataValues.id,
			filename: photo.dataValues.fileName,
			userId: photo.dataValues.userId,
		})
	);
	// console.log(fileData);
	return fileData;
};

module.exports = router;
