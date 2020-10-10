const express = require("express");
const router = express.Router();

// include CLOUDINARY:
const uploader = require("../cloudinary.config");

router.post("/upload", uploader.single("resumeUploadUrl"), (req, res, next) => {
  console.log("file is: ", req.file);
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ secure_url: req.file.path });
});

module.exports = router;