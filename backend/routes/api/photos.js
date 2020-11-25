const express = require("express");
const asyncHandler = require("express-async-handler");
const { User, Photo, Album, Tag, Comment } = require("../../db/models");

const router = express.Router();

// Get image filenames for feed
router.get(
	"",
	asyncHandler(async (req, res) => {
		const feedPhotos = await Photo.findAll({include: [{model:User}]});
		const fileData = getPhotoData(feedPhotos);
		res.send(fileData);
	})
);

// Get all images associated with specific user
router.get(
	"/:id(\\d+)/",
	asyncHandler(async (req, res) => {
		const photos = await Photo.findAll({
			where: { userId: req.params.id },
			include: [{ model: User }],
		});
		const data = getPhotoData(photos);
		res.send(data);
	})
);

// Look up photo by fileName
router.get(
	"/:name([\\w.]+)",
	asyncHandler(async (req, res) => {
		const photo = await Photo.findOne({ where: { fileName: req.params.name } });
		res.send(photo);
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

// Get album contents by name
router.get(
	"/:id(\\d+)/albums/:name(\\w+)",
	asyncHandler(async (req, res) => {
		// Change param into db friendly string
		// Tested with underscores (British_Food_Classics)
		const query = req.params.name.split("_").join(" ");

		const albumContents = await Album.findAll({
			where: { albumName: query },
			include: [{ model: Photo }, { model: User }],
		});

		const data = getAllAlbumPhotos(albumContents);

		res.send(data);
	})
);

// Get all photos assocaited with a Tag
router.get(
	"/tag/:name(\\w+)",
	asyncHandler(async (req, res) => {
		const tagPhotos = await Tag.findAll({
			where: { tagName: req.params.name },
			include: [{ model: Photo }],
		});
		const data = getTagData(tagPhotos);

		res.send(data);
	})
);

// Get all comments associated with a photo
router.get(
	"/comments/:name",
	asyncHandler(async (req, res) => {
		const photo = await Photo.findOne({ where: { fileName: req.params.name } });
		const comments = await Comment.findAll({
			where: { photoId: photo.id },
			include: [{ model: User }],
		});
		const data = getCommentData(comments, photo.id);
		res.send(data);
	})
);

router.post("/tags", asyncHandler(async (req, res) => {
	// console.log("SERVER TAGS" ,req.body.tags)
	const tags = req.body.tags;
	const photoId = req.body.photoId;
	// console.log( "TAGS" ,tags)
	// console.log("USERID", photoId)
	if (photoId) {
		const createdTags = await tags.forEach(async (tagName) => {
			await Tag.create({
				tagName,
				photoId,

			});
		})
	} else {res.end()}
	res.end()
}))

router.post("/create", asyncHandler( async(req, res) => {
	console.log(req.body)
	const photo = await Photo.create(req.body);
	res.json(photo)
}));

router.post("/comment", asyncHandler(async (req, res) => {
	const data = req.body
	// console.log(data)
	const comment = await Comment.create(data);
	res.send(comment)
}))

const getCommentData = (comments, photoId) => {
	let data = [];
	comments.map(comment => data.push({
		username: comment.User.username,
		comment: comment.comment,
		createdAt: comment.createdAt,
		photoId
	}))

	return data;
}

// Return fileNames associated with a particular Tag
const getTagData = (tags) => {
	let data = [];

	tags.map((tag) => {
		data.push({
			tagName: tag.tagName,
			photoId: tag.photoId,
			fileName: tag.Photo.fileName,
			userId: tag.Photo.userId,
		});
	});
	return data;
};

// Return all photo data associated with album
const getAllAlbumPhotos = (albums) => {
	let data = [];

	albums.map((album) => {
		// Follow other route structures for easy store insertion
		data.push({
			userId: album.userId,
			albumName: album.albumName,
			photoId: album.photoId,
			fileName: album.Photo.fileName,
			username: album.User.username,
		});
	});

	return data;
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

	// console.log("list", albumData);
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
			username: photo.dataValues.User.username,
		})
	);

	return fileData;
};

module.exports = router;
