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

router.post("/upload", (req, res) => {
  try {
    console.log(req.files);
    res.json("img received");
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
