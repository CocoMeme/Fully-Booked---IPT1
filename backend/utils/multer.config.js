const multer = require('multer');

// Set up storage (in memory for simplicity)
const storage = multer.memoryStorage();

// Multer configuration for file uploads
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedFormats.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only JPG, JPEG, and PNG are allowed.'));
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

module.exports = { upload };
