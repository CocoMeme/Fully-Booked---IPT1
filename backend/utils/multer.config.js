const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary.config');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'books', // Specify folder name in Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png'],
    },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedFormats.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only JPG, JPEG, and PNG are allowed.'));
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

module.exports = upload;