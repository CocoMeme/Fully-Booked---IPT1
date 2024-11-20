const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// cloudinary.uploader.upload(
//     "C:\\Users\\coand\\Documents\\College Files\\3rd Year\\1st Semester\\IPT 1\\Fully Booked\\frontend\\src\\assets\\books\\ride-lifetime.png",
//     (error, result) => {
//       if (error) console.error("Upload Error:", error);
//       else console.log("Upload Success:", result);
//     }
//   );

module.exports = cloudinary;
