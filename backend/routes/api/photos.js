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
	"/:id(\\d+)/albums",
	asyncHandler(async (req, res) => {
		const albums = await Album.findAll({ where: { userId: req.params.id } });
		const data = getAlbumData(albums, req.params.id);
		res.send(data);
	})
);

router.get(
	"/:id(\\d+)/albums/:name(\\w+)",
	asyncHandler(async (req, res) => {
		//Change param into db friendly string
		const query = req.params.name.split("_").join(" ");

		const albumContents = await Album.findAll({ where: { albumName: query } });

		getAllAlbumPhotos(albumContents, req.params.id)

		res.send(albumContents);
		// res.end()
	})
);
//TODO: debug why this push is not working properly.
// Return all photo data associated with album
const getAllAlbumPhotos = async (albums, userId) => {
	let filenames = [];

	await albums.forEach(async(album) => {
		const filename = await Photo.findByPk(album.photoId);
		console.log("FILENAME", filename.dataValues.fileName)
		filenames.push(filename.dataValues.fileName)
	});
	console.log("ARRAY", filenames)
	return filenames;
};

// Return a full list of albums
const getAlbumData = (albums, userId) => {
	// find all unique album names
	let albumList = new Set();
	albums.map((album) => {
		albumList.add(album.dataValues.albumName);
	});

	// iterate through each to return an array of objects
	// keep outputs uniform with other routes
	let albumData = [];
	albumList.forEach((album) =>
		albumData.push({
			albumName: album,
			userId,
		})
	);

	console.log("list", albumData);
	return albumData;
};

// Send minimum amount of photo data back to front-end
const getPhotoData = (photos) => {
	let fileData = [];
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
