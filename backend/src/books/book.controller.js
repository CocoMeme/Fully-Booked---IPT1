const Book = require('./book.model');
const uploadToCloudinary = require('../../utils/cloudinaryUploader');

const postBook = async (req, res) => {
  try {
    const { body } = req;

    console.log("Request Body:", body);

    // Check if coverImage URLs are provided
    if (!body.coverImage || !Array.isArray(body.coverImage) || body.coverImage.length === 0) {
      return res.status(400).send({ message: "At least one image URL is required!" });
    }

    // Create new book with the provided data
    const newBook = new Book({
      ...body,
      coverImage: body.coverImage, // Use URLs directly from the body
    });

    // Save the book to the database
    await newBook.save();

    res.status(200).send({ message: "Book posted successfully!", book: newBook });
  } catch (error) {
    console.error("Error: Creating Book", error);
    res.status(500).send({ message: "Book post failed!", error: error.message });
  }
};


const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the existing book
    const existingBook = await Book.findById(id);
    if (!existingBook) {
      return res.status(404).send({ message: "Book not found!" });
    }

    const { body, files } = req;

    // Upload new images if provided
    let updatedImages = existingBook.coverImage;
    if (files && files.length > 0) {
      const uploadedImages = await Promise.all(
        files.map(async (file) => {
          const result = await uploadToCloudinary(file, 'Fully Booked');
          if (!result.success) throw new Error(result.error);
          return result.url;
        })
      );

      updatedImages = uploadedImages; // Replace all old images
    }

    // Update the book fields
    const updatedData = {
      ...body,
      coverImage: updatedImages,
    };

    const updatedBook = await Book.findByIdAndUpdate(id, updatedData, { new: true });

    res.status(200).send({
      message: "Book updated successfully!",
      book: updatedBook,
    });
  } catch (error) {
    console.error("Error: Updating Book", error);
    res.status(500).send({ message: "Failed to update the book!", error: error.message });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).send(books);
  } catch (error) {
    console.error("Error: Fetching Books", error);
    res.status(500).send({ message: "Fetch books failed!", error: error.message });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({ message: "Book not found!" });
    }
    res.status(200).send(book);
  } catch (error) {
    console.error("Error: Fetching Book", error);
    res.status(500).send({ message: "Fetch book failed!", error: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).send({ message: "Book not found!" });
    }

    res.status(200).send({
      message: "Book deleted successfully!",
      book: deletedBook,
    });
  } catch (error) {
    console.error("Error: Deleting Book", error);
    res.status(500).send({ message: "Delete book failed!", error: error.message });
  }
};

module.exports = {
  postBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
