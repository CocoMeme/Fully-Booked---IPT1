const express = require('express');
const Book = require('./book.model');
const { postBook, getAllBooks, getSingleBook, updateBook, deleteBook } = require('./book.controller');
const router = express.Router();


router.post("/create-book", postBook)
router.get("/", getAllBooks)
router.get("/:id", getSingleBook)
router.put("/edit/:id", updateBook)
router.delete("/:id", deleteBook)

module.exports = router;