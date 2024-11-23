const cloudinary = require('../utils/cloudinary.config');
const streamifier = require('streamifier');

const uploadToCloudinary = async (file, folder = 'Fully Booked', options = {}) => {
  try {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder, resource_type: 'image', ...options },
        (error, result) => {
          if (error) return reject(error);
          resolve({
            success: true,
            url: result.secure_url,
            public_id: result.public_id,
          });
        }
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream); // Stream the file buffer
    });
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports = uploadToCloudinary;
