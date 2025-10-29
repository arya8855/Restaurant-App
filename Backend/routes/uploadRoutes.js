const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const router = express.Router();


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'restaurant_menu', 
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });


router.post('/', upload.single('image'), (req, res) => {
  try {
    res.json({
      success: true,
      imageUrl: req.file.path, 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
