const router = require("express").Router();

const cloudinary = require("cloudinary");

const auth = require("../middleware/auth");

const authAdmin = require("../middleware/authAdmin");

//upload img using cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
