const express = require('express');
const Book = require('./book.model');
const { postBook, getAllBooks, getSingleBook, updateBook, deleteBook } = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router = express.Router();


router.post("/create-book", verifyAdminToken, postBook)
router.get("/", getAllBooks)
router.get("/:id", getSingleBook)
router.put("/edit/:id", verifyAdminToken, updateBook)
router.delete("/:id", verifyAdminToken, deleteBook)

module.exports = router;