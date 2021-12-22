const router = require("express").Router();

const cloudinary = require("cloudinary");

const auth = require("../middleware/auth");

const authAdmin = require("../middleware/authAdmin");
const fs = require("fs");
//upload img using cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//upload image for admin only
router.post("/upload", auth, authAdmin, (req, res) => {
  try {
    console.log(req.files);
    //in case nothing uploaded
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).send("no files were uploaded");

    const file = req.files.file;
    //1 mo size 1024*1024
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "size too large" });
    }
    //handleing type of img
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "file format is incorrect." });
    }

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "test" },
      async (err, result) => {
        if (err) throw err;
        removeTmp(file.tempFilePath);

        return res.json({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

//delete image
router.post("/destroy", (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ msg: "no images selected" });

    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;

      return res.json({ msg: " deleted img" });
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

//removing Tmp folder after each upload
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = router;
