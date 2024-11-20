const express = require('express');
const { postBook, getAllBooks, getSingleBook, updateBook, deleteBook } = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const upload = require('../../utils/multer.config');
const router = express.Router();

router.post("/create-book", verifyAdminToken, upload.single('coverImage'), postBook);
router.get("/", getAllBooks);
router.get("/:id", getSingleBook);
router.put('/edit/:id', upload.single('coverImage'), verifyAdminToken, updateBook);
// router.put("/edit/:id", verifyAdminToken, updateBook);
router.delete("/:id", verifyAdminToken, deleteBook);

router.post("/upload-cover", upload.single("file"), async (req, res) => {
    try {
      console.log(req.file); // Log the uploaded file
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded!" });
      }
  
      const { path } = req.file; // Cloudinary URL
      res.status(200).json({ coverImage: path });
    } catch (error) {
      console.error("Error uploading cover image:", error);
      res.status(500).json({ message: "Image upload failed!" });
    }
  });
  
  

module.exports = router;
