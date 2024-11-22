const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary.config');

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'books', // Name of the folder in Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed image formats
    },
});

// Multer configuration for file uploads
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

// Multer middleware for handling multiple file uploads (up to 5 images)
const uploadMultiple = upload.array('images', 5); 

module.exports = { upload, uploadMultiple };
