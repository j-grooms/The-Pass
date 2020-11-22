const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Photo } = require("../../db/models");

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

// Sign up
router.post(
  '',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

// Get image filenames for feed
// router.get(
//   '/photos',
//   asyncHandler( async(req, res) => {
//     const feedPhotos = await Photo.findAll({});
//     const filenames = filenameData(feedPhotos)
//     res.send(filenames)
//   })
// )

// const filenameData = (photos) => {
//   let filenames = [];
//   // console.log(photos[1])
//   // console.log(photos[1].dataValues.fileName)
//   photos.map((photo) => filenames.push(photo.dataValues.fileName));
//   return filenames;
// }

module.exports = router;
