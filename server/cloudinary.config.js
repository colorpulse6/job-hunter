const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_USERNAME || process.env.CLOUDINARY_USERNAME,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET || process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  folder: "jobhunter", 
 
  allowedFormats: ["jpg", "png", "pdf"],
  params: { format: 'jpg' }, 
//   => this is in case you want to upload other type of files, not just images
  filename: function (req, res, cb) {
    cb(null, res.originalname); 
    // The file on cloudinary would have the same name as the original file name
  },
});

module.exports = multer({ storage });