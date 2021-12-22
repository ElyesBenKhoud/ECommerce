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
    //in case nothing uploaded
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).send("no files were uploaded");

    const file = req.files.file;
    //1 mo size 1024*1024
    if (file.size > 1024 * 1024)
      return res.status(400).json({ msg: "size too large" });
    //handleing type of img
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png")
      return res.status(400).json({ msg: "file format is incorrect." });

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "test" },
      async (err, result) => {
        if (err) throw err;

        res.json({ public_id: result.public_id, url: result.secure_url });
      }
    );
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
