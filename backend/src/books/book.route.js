const express = require('express');
const { 
    postBook, 
    getAllBooks, 
    getSingleBook, 
    updateBook, 
    deleteBook 
} = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const { uploadMultiple } = require('../../utils/multer.config');
const router = express.Router();

// Route to create a new book with multiple images
router.post("/create-book", verifyAdminToken, uploadMultiple, postBook);

// Route to get all books
router.get("/", getAllBooks);

// Route to get a single book by its ID
router.get("/:id", getSingleBook);

// Route to update a book with new data and multiple images
router.put("/edit/:id", uploadMultiple, verifyAdminToken, updateBook);

// Route to delete a book by its ID
router.delete("/:id", verifyAdminToken, deleteBook);

// Route to upload images and return their Cloudinary URLs
router.post("/upload-cover", uploadMultiple, async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No file uploaded!" });
        }

        const imageUrls = req.files.map(file => file.path); // Extract Cloudinary URLs
        res.status(200).json({ coverImages: imageUrls });
    } catch (error) {
        console.error("Error uploading cover image(s):", error);
        res.status(500).json({ message: "Image upload failed!" });
    }
});

module.exports = router;
