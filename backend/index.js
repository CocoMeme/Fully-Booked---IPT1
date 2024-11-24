const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const port = process.env.port || 5000;
require('dotenv').config();

// Import the reusable upload function
const uploadToCloudinary = require('../backend/utils/cloudinaryUploader');
const { upload } = require('../backend/utils/multer.config');

// MIDDLEWARE
app.use(express.json());

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error!';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
}));

// ROUTES
const reviewRoutes = require('./src/reviews/review.route');
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require('./src/orders/order.route');
const userRoutes = require('./src/users/user.route');
const adminRoutes = require('./src/stats/admin.stats');

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reviews", reviewRoutes);

// ROOT ROUTE
app.use("/", (req, res) => {
  res.send("Fully Booked Server is running!");
});

// Endpoint for uploading images
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    const result = await uploadToCloudinary(req.file, 'Fully Booked');
    if (!result.success) throw new Error(result.error);

    res.status(200).json({
      message: 'Image uploaded successfully!',
      url: result.url,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to upload image!',
      error: error.message,
    });
  }
});

async function main() {
  await mongoose.connect(process.env.DB_URL);
  console.log("Mongodb connected successfully!");
}

main().catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Fully Booked app listening on port ${port}`);
});
